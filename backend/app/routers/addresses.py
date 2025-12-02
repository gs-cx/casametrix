# /opt/casamx/api/app/routers/addresses.py
import os
import uuid
import json
from typing import List, Optional

from fastapi import APIRouter, HTTPException, Query, Request
from pydantic import BaseModel
import psycopg2
import psycopg2.extras

import urllib.parse
import urllib.request


router = APIRouter(prefix="/addresses", tags=["addresses"])


# =========================
# Modèles Pydantic
# =========================

class BanSuggestion(BaseModel):
    label: str
    city: Optional[str] = None
    postal_code: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    score: Optional[float] = None
    source: str = "ban"


class BanSelection(BaseModel):
    label: str
    city: Optional[str] = None
    postal_code: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None


class AddressResult(BaseModel):
    id: str  # UUID côté DB
    address: str
    postal_code: Optional[str] = None
    city: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    distance_m: Optional[float] = None


# =========================
# Config DB & helpers
# =========================

ADDRESS_TABLE = os.getenv("CASAMX_ADDRESS_TABLE", "public.addresses")


def get_db_conn() -> psycopg2.extensions.connection:
    dsn = os.getenv("DATABASE_URL")
    if dsn:
        return psycopg2.connect(dsn, cursor_factory=psycopg2.extras.RealDictCursor)
    return psycopg2.connect(
        host=os.getenv("PGHOST", "127.0.0.1"),
        port=os.getenv("PGPORT", "5432"),
        dbname=os.getenv("PGDATABASE", "casamx"),
        user=os.getenv("PGUSER", "casamx_api"),
        password=os.getenv("PGPASSWORD", ""),
        cursor_factory=psycopg2.extras.RealDictCursor,
    )


def get_client_ip(request: Request) -> str:
    # On privilégie X-Forwarded-For (Nginx) puis l'IP directe
    xff = request.headers.get("x-forwarded-for") or request.headers.get("X-Forwarded-For")
    if xff:
        # format typique: "client, proxy1, proxy2"
        return xff.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


def is_authenticated(request: Request) -> bool:
    auth = request.headers.get("authorization") or request.headers.get("Authorization")
    if not auth:
        return False
    return auth.lower().startswith("bearer ")


def enforce_rate_limit(conn: psycopg2.extensions.connection, ip: str, max_per_day: int = 3) -> None:
    """
    Limite simple : max_per_day requêtes par jour et par IP, pour les appels sans JWT.
    """
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT COUNT(*) AS cnt
            FROM public.search_usage
            WHERE ip_address = %s
              AND queried_at >= date_trunc('day', now())
            """,
            (ip,),
        )
        row = cur.fetchone()
        count = int(row["cnt"]) if row and "cnt" in row else 0

    if count >= max_per_day:
        raise HTTPException(
            status_code=429,
            detail=(
                "Quota de recherche anonyme atteint pour aujourd'hui. "
                "Créez un compte Casametrix ou réessayez demain."
            ),
        )


def log_search_usage(
    conn: psycopg2.extensions.connection,
    ip: str,
    query: str,
    user_id: Optional[str] = None,
) -> None:
    """
    Insère une ligne dans public.search_usage.
    """
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO public.search_usage (id, user_id, ip_address, query)
            VALUES (%s, %s, %s, %s)
            """,
            (str(uuid.uuid4()), user_id, ip, query),
        )


# =========================
# BAN autocomplete (proxy)
# =========================

def call_ban_api(q: str, limit: int) -> List[BanSuggestion]:
    base_url = "https://api-adresse.data.gouv.fr/search/"
    params = {
        "q": q,
        "limit": str(limit),
    }
    url = f"{base_url}?{urllib.parse.urlencode(params)}"

    req = urllib.request.Request(url, method="GET")
    with urllib.request.urlopen(req, timeout=5) as resp:
        raw = resp.read()
    data = json.loads(raw.decode("utf-8"))

    features = data.get("features", [])
    results: List[BanSuggestion] = []

    for feat in features:
        props = feat.get("properties", {}) or {}
        geom = feat.get("geometry", {}) or {}
        coords = geom.get("coordinates") or [None, None]
        lon, lat = None, None
        if isinstance(coords, (list, tuple)) and len(coords) >= 2:
            lon = coords[0]
            lat = coords[1]

        suggestion = BanSuggestion(
            label=props.get("label") or "",
            city=props.get("city"),
            postal_code=props.get("postcode"),
            lat=lat,
            lng=lon,
            score=props.get("score"),
            source="ban",
        )
        results.append(suggestion)

    return results


@router.get("/ban-autocomplete", response_model=List[BanSuggestion])
def ban_autocomplete(
    request: Request,
    q: str = Query(..., min_length=2, description="Texte libre de recherche d'adresse"),
    limit: int = Query(8, ge=1, le=20),
):
    """
    Proxy vers la Base Adresse Nationale (BAN).
    Applique un quota simple de 3 requêtes/jour/IP pour les appels sans JWT.
    """
    ip = get_client_ip(request)
    authenticated = is_authenticated(request)

    with get_db_conn() as conn:
        # Quota uniquement pour les utilisateurs non authentifiés
        if not authenticated:
            enforce_rate_limit(conn, ip)

        # On loggue systématiquement la recherche
        log_search_usage(conn, ip=ip, query=q, user_id=None)

    try:
        suggestions = call_ban_api(q=q, limit=limit)
    except Exception as e:  # noqa: BLE001
        print("Erreur lors de l'appel BAN:", e)
        raise HTTPException(status_code=502, detail="Erreur lors de l'appel à la Base Adresse Nationale")

    return suggestions


# =========================
# Enregistrement sélection BAN -> public.addresses
# =========================

@router.post("/ban-log", response_model=AddressResult)
def ban_log(selection: BanSelection):
    """
    Reçoit une sélection BAN et l'enregistre dans la table interne public.addresses
    (ou réutilise une ligne existante avec la même (address, postal_code, city)).
    """
    label = selection.label.strip()
    if not label:
        raise HTTPException(status_code=400, detail="Le champ 'label' est requis.")

    with get_db_conn() as conn:
        with conn.cursor() as cur:
            # 1) On cherche une ligne existante avec même signature
            cur.execute(
                f"""
                SELECT id, address, postal_code, city, lat, lng
                FROM {ADDRESS_TABLE}
                WHERE address = %s
                  AND postal_code IS NOT DISTINCT FROM %s
                  AND city IS NOT DISTINCT FROM %s
                LIMIT 1
                """,
                (label, selection.postal_code, selection.city),
            )
            row = cur.fetchone()

            if row:
                address_id = str(row["id"])
                address = row["address"]
                postal_code = row["postal_code"]
                city = row["city"]
                lat = row["lat"]
                lng = row["lng"]
            else:
                # 2) Sinon, on insère une nouvelle adresse avec un UUID généré côté Python
                address_id = str(uuid.uuid4())
                cur.execute(
                    f"""
                    INSERT INTO {ADDRESS_TABLE} (id, address, postal_code, city, lat, lng)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id, address, postal_code, city, lat, lng
                    """,
                    (
                        address_id,
                        label,
                        selection.postal_code,
                        selection.city,
                        selection.lat,
                        selection.lng,
                    ),
                )
                row = cur.fetchone()
                address = row["address"]
                postal_code = row["postal_code"]
                city = row["city"]
                lat = row["lat"]
                lng = row["lng"]

        # Le contexte "with conn" fera le commit automatique si pas d'exception
    return AddressResult(
        id=address_id,
        address=address,
        postal_code=postal_code,
        city=city,
        lat=lat,
        lng=lng,
        distance_m=None,
    )


# =========================
# /addresses/search
# =========================

@router.get("/search", response_model=List[AddressResult])
def search_addresses(
    request: Request,
    q: str = Query(..., min_length=2, description="Texte à chercher dans address/city/postal_code"),
    limit: int = Query(10, ge=1, le=50),
    lat: Optional[float] = Query(None, description="Latitude pour tri par distance"),
    lng: Optional[float] = Query(None, description="Longitude pour tri par distance"),
):
    """
    Recherche dans la table interne d'adresses (public.addresses par défaut).
    Peut trier par distance si lat/lng fournis.
    Applique le même quota pour les requêtes anonymes (3/jour/IP).
    """
    ip = get_client_ip(request)
    authenticated = is_authenticated(request)

    with get_db_conn() as conn:
        if not authenticated:
            enforce_rate_limit(conn, ip)

        log_search_usage(conn, ip=ip, query=q, user_id=None)

        params = {
            "pattern": f"%{q.strip()}%",
        }
        sql_base = f"""
            SELECT
                id,
                address,
                postal_code,
                city,
                lat,
                lng,
                created_at
        """

        if lat is not None and lng is not None:
            # Distance approximative en mètres
            sql_base += """
                , CASE
                    WHEN lat IS NOT NULL AND lng IS NOT NULL THEN
                        111320 * sqrt(
                            (lat - %(lat)s) * (lat - %(lat)s) +
                            ((lng - %(lng)s) * cos(radians(%(lat)s))) *
                            ((lng - %(lng)s) * cos(radians(%(lat)s)))
                        )
                    ELSE NULL
                  END AS distance_m
            """
            params["lat"] = lat
            params["lng"] = lng
        else:
            sql_base += ", NULL::double precision AS distance_m"

        sql_where = """
            FROM {table}
            WHERE
                (address ILIKE %(pattern)s)
                OR (city ILIKE %(pattern)s)
                OR (postal_code ILIKE %(pattern)s)
        """.format(
            table=ADDRESS_TABLE
        )

        if lat is not None and lng is not None:
            sql_order = " ORDER BY distance_m NULLS LAST, created_at DESC "
        else:
            sql_order = " ORDER BY created_at DESC "

        sql_limit = " LIMIT %(limit)s"
        params["limit"] = limit

        sql = sql_base + sql_where + sql_order + sql_limit

        with conn.cursor() as cur:
            cur.execute(sql, params)
            rows = cur.fetchall()

    results: List[AddressResult] = []
    for row in rows:
        results.append(
            AddressResult(
                id=str(row["id"]),
                address=row["address"],
                postal_code=row.get("postal_code"),
                city=row.get("city"),
                lat=row.get("lat"),
                lng=row.get("lng"),
                distance_m=row.get("distance_m"),
            )
        )
    return results


# =========================
# /addresses/near
# =========================

@router.get("/near", response_model=List[AddressResult])
def addresses_near(
    request: Request,
    lat: float = Query(..., description="Latitude du point de référence"),
    lng: float = Query(..., description="Longitude du point de référence"),
    radius_m: int = Query(
        500,
        ge=10,
        le=20000,
        description="Rayon de recherche en mètres (entre 10 et 20000)",
    ),
    limit: int = Query(20, ge=1, le=100),
):
    """
    Retourne les adresses les plus proches d'un point GPS
    dans un rayon donné, à partir de la table interne.
    Applique également le quota pour les requêtes anonymes.
    """
    ip = get_client_ip(request)
    authenticated = is_authenticated(request)

    with get_db_conn() as conn:
        if not authenticated:
            enforce_rate_limit(conn, ip)

        query_label = f"near:{lat},{lng},r={radius_m}"
        log_search_usage(conn, ip=ip, query=query_label, user_id=None)

        params = {
            "lat": lat,
            "lng": lng,
            "radius_m": radius_m,
            "limit": limit,
        }

        sql = f"""
            SELECT
                id,
                address,
                postal_code,
                city,
                lat,
                lng,
                111320 * sqrt(
                    (lat - %(lat)s) * (lat - %(lat)s) +
                    ((lng - %(lng)s) * cos(radians(%(lat)s))) *
                    ((lng - %(lng)s) * cos(radians(%(lat)s)))
                ) AS distance_m
            FROM {ADDRESS_TABLE}
            WHERE
                lat IS NOT NULL
                AND lng IS NOT NULL
            HAVING
                111320 * sqrt(
                    (lat - %(lat)s) * (lat - %(lat)s) +
                    ((lng - %(lng)s) * cos(radians(%(lat)s))) *
                    ((lng - %(lng)s) * cos(radians(%(lat)s)))
                ) <= %(radius_m)s
            ORDER BY distance_m ASC
            LIMIT %(limit)s
        """

        # Note : usage de HAVING sans GROUP BY volontaire pour filtrer sur l'alias distance_m calculé
        with conn.cursor() as cur:
            cur.execute(sql, params)
            rows = cur.fetchall()

    results: List[AddressResult] = []
    for row in rows:
        results.append(
            AddressResult(
                id=str(row["id"]),
                address=row["address"],
                postal_code=row.get("postal_code"),
                city=row.get("city"),
                lat=row.get("lat"),
                lng=row.get("lng"),
                distance_m=row.get("distance_m"),
            )
        )
    return results
