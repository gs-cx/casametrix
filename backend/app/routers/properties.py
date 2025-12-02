# /opt/casamx/api/app/routers/properties.py
import os
from typing import List, Optional, Dict, Any

from fastapi import APIRouter, HTTPException, Query, Request
from pydantic import BaseModel
import psycopg2
import psycopg2.extras

router = APIRouter(prefix="/properties", tags=["properties"])

ADDRESS_TABLE = os.getenv("CASAMX_ADDRESS_TABLE", "public.addresses")


# =========================
# Modèles Pydantic
# =========================

class PropertyAddress(BaseModel):
  id: str
  address: str
  postal_code: Optional[str] = None
  city: Optional[str] = None
  lat: Optional[float] = None
  lng: Optional[float] = None


class DVFTransaction(BaseModel):
  source: str = "dvf"
  # Champs placeholders pour future intégration
  year: Optional[int] = None
  price: Optional[float] = None
  surface: Optional[float] = None
  nature: Optional[str] = None
  raw: Optional[Dict[str, Any]] = None


class DPERating(BaseModel):
  source: str = "dpe"
  # Champs placeholders pour future intégration
  letter: Optional[str] = None
  ges_letter: Optional[str] = None
  date: Optional[str] = None
  raw: Optional[Dict[str, Any]] = None


class PropertyByAddressResponse(BaseModel):
  address: PropertyAddress
  dvf: List[DVFTransaction]
  dpe: List[DPERating]
  cadastre: Optional[Dict[str, Any]] = None
  scoring: Optional[Dict[str, Any]] = None


# =========================
# Helpers DB & Auth light
# =========================

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


def ensure_authenticated(request: Request) -> None:
  """
  Vérifie simplement la présence d'un header Authorization: Bearer ...
  (placeholder en attendant le câblage avec la vraie dépendance JWT globale).
  """
  auth = request.headers.get("authorization") or request.headers.get("Authorization")
  if not auth or not auth.lower().startswith("bearer "):
    raise HTTPException(
      status_code=401,
      detail="Authentification JWT requise pour accéder à /properties/by-address",
    )


# =========================
# /properties/by-address
# =========================

@router.get("/by-address", response_model=PropertyByAddressResponse)
def get_property_by_address(
  request: Request,
  address_id: str = Query(
    ...,
    description="UUID d'une ligne dans la table interne des adresses (public.addresses)",
  ),
):
  """
  Retourne un objet 'PropertyRecord' minimal à partir d'un ID d'adresse interne.
  Pour l'instant :
    - lit uniquement public.addresses
    - retourne des blocs dvf/dpe/cadastre/scoring vides (skeleton)
  """
  # 1) Auth exigée (JWT présent dans Authorization)
  ensure_authenticated(request)

  # 2) Récupérer l'adresse pivot
  with get_db_conn() as conn:
    with conn.cursor() as cur:
      cur.execute(
        f"""
        SELECT
          id,
          address,
          postal_code,
          city,
          lat,
          lng
        FROM {ADDRESS_TABLE}
        WHERE id = %s
        """,
        (address_id,),
      )
      row = cur.fetchone()

  if not row:
    raise HTTPException(
      status_code=404,
      detail=f"Aucune adresse trouvée pour id={address_id}",
    )

  addr = PropertyAddress(
    id=str(row["id"]),
    address=row["address"],
    postal_code=row.get("postal_code"),
    city=row.get("city"),
    lat=row.get("lat"),
    lng=row.get("lng"),
  )

  # 3) Pour l'instant, blocs de données vides
  dvf: List[DVFTransaction] = []
  dpe: List[DPERating] = []
  cadastre: Optional[Dict[str, Any]] = None
  scoring: Optional[Dict[str, Any]] = None

  # TODO (phase suivante) :
  # - Alimenter dvf à partir des tables DVF
  # - Alimenter dpe à partir des tables DPE
  # - Récupérer info parcellaire/cadastre
  # - Calculer un scoring agrégé

  return PropertyByAddressResponse(
    address=addr,
    dvf=dvf,
    dpe=dpe,
    cadastre=cadastre,
    scoring=scoring,
  )
