from __future__ import annotations

import os
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
import psycopg2
from psycopg2.extras import RealDictCursor

# --- Config JWT ---
SECRET_KEY = os.getenv("JWT_SECRET", "CHANGE_ME_SUPER_SECRET")
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# --- DB utilitaire ---
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://casamx_api:CasamxDB2025!@127.0.0.1:5432/casamx"
)

def get_db_conn():
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

# --- Dépendance utilisateur courant ---
def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token payload invalid",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Charger l’utilisateur depuis la BDD
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, email, created_at FROM public.users WHERE id = %s", (user_id,))
        user = cur.fetchone()
        cur.close()
        conn.close()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return dict(user)
