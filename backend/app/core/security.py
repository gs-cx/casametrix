# app/core/security.py
from __future__ import annotations

import os
import time
from typing import Optional, Annotated
from dataclasses import dataclass

import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from pydantic import BaseModel

# =========================
# Configuration environnement
# =========================
CASAMETRIX_ENV = os.getenv("CASAMETRIX_ENV", "prod")
IS_PROD = CASAMETRIX_ENV == "prod"

_raw_secret = os.getenv("JWT_SECRET", "").strip()
if IS_PROD and (not _raw_secret or _raw_secret == "CHANGE_ME_SUPER_SECRET"):
    # En production, on refuse de démarrer si le secret n'est pas correctement défini.
    raise RuntimeError(
        "JWT_SECRET n'est pas défini ou utilise la valeur par défaut. "
        "Définissez une valeur forte dans l'environnement (ex: systemd / .env)."
    )

JWT_SECRET = _raw_secret or "DEV_ONLY_INSECURE_SECRET"
JWT_ALG = os.getenv("JWT_ALG", "HS256")

# Durée de vie en minutes (ex: 60 * 24 = 1 jour)
JWT_EXPIRES_MIN = int(os.getenv("JWT_EXPIRES_MIN", "1440"))

# Coût bcrypt (4 à 31). 12 est un bon compromis 2025.
BCRYPT_ROUNDS = int(os.getenv("BCRYPT_ROUNDS", "12"))

bearer_scheme = HTTPBearer(auto_error=True)


# =========================
# Modèles
# =========================
class User(BaseModel):
    id: str
    email: str
    org_id: str
    is_active: bool = True


@dataclass
class TokenData:
    sub: str
    org_id: str
    email: str
    exp: int


# =========================
# Bcrypt helpers
# =========================
def hash_password(plaintext: str) -> str:
    """
    Hash sécurisé d'un mot de passe avec bcrypt.
    """
    salt = bcrypt.gensalt(rounds=BCRYPT_ROUNDS)
    return bcrypt.hashpw(plaintext.encode("utf-8"), salt).decode()


def verify_password(plaintext: str, password_hash: str) -> bool:
    """
    Vérifie un mot de passe en gérant les erreurs de manière sûre.
    """
    try:
        return bcrypt.checkpw(plaintext.encode("utf-8"), password_hash.encode("utf-8"))
    except Exception:
        # Si le hash est illisible (corrompu), on renvoie False sans exposer l'erreur.
        return False


# =========================
# JWT helpers
# =========================
def create_access_token(
    *, user_id: str, org_id: str, email: str, expires_min: Optional[int] = None
) -> str:
    now = int(time.time())
    ttl = int(expires_min or JWT_EXPIRES_MIN) * 60
    payload = {
        "sub": user_id,
        "org_id": org_id,
        "email": email,
        "iat": now,
        "exp": now + ttl,
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)
    return token


def decode_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        return TokenData(
            sub=str(payload.get("sub")),
            org_id=str(payload.get("org_id")),
            email=str(payload.get("email")),
            exp=int(payload.get("exp")),
        )
    except JWTError as e:
        # Token invalide ou expiré
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalide",
        ) from e


# =========================
# Dépendance FastAPI
# =========================
async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(bearer_scheme)]
) -> User:
    """
    Extrait l'utilisateur depuis le Bearer JWT.
    """
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header manquant",
        )

    token = credentials.credentials
    data = decode_token(token)

    # Ici on pourrait recharger l'utilisateur en base si nécessaire (statut actif, etc.).
    # Pour limiter les allers-retours, on se contente des claims, avec un is_active=True par défaut.
    return User(id=data.sub, email=data.email, org_id=data.org_id, is_active=True)
