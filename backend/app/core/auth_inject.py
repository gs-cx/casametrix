from __future__ import annotations

import os
from typing import Optional

import jwt
from fastapi import Depends, Header, HTTPException, status

from app.schemas import UserCtx

# Doivent être alignés avec app/auth.py
SECRET_KEY = os.getenv("CASAMX_JWT_SECRET", "change-me-please")
ALGORITHM = "HS256"


def _bearer_token(authorization: Optional[str]) -> str:
    """
    Extrait le token de l'en-tête Authorization: Bearer <token>.
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
        )
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Authorization header format",
        )
    return parts[1]


def inject_user(authorization: Optional[str] = Header(None)) -> UserCtx:
    """
    Dépendance FastAPI qui valide le JWT et retourne un UserCtx.
    """
    token = _bearer_token(authorization)
    try:
        claims = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )

    # Construit le UserCtx depuis les claims attendus
    try:
        return UserCtx(
            user_id=claims.get("user_id", "user"),
            org_id=claims.get("org_id", "ORG1"),
            email=claims.get("email"),
            is_admin=bool(claims.get("is_admin", False)),
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token claims"
        )
