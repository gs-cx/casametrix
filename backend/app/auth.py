import os
import jwt
import psycopg2
import bcrypt
from datetime import datetime, timedelta

from fastapi import (
    APIRouter, HTTPException, Depends, status, Response, Request, Form
)
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

# ---------------------------------------------------------
# Config
# ---------------------------------------------------------
SECRET_KEY = os.getenv("CASAMX_JWT_SECRET")
if not SECRET_KEY:
    raise RuntimeError("CASAMX_JWT_SECRET manquant dans /etc/casamx-api.env")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL manquant dans /etc/casamx-api.env")

router = APIRouter()

# ---------------------------------------------------------
# Models
# ---------------------------------------------------------
class UserOut(BaseModel):
    user_id: str
    org_id: str
    email: str
    full_name: str
    is_admin: bool


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    org_id: str
    user_id: str
    email: str
    full_name: str
    is_admin: bool


# ---------------------------------------------------------
# Utils
# ---------------------------------------------------------
def db_connect():
    return psycopg2.connect(DATABASE_URL)


def verify_password(password: str, hashed: bytes) -> bool:
    try:
        return bcrypt.checkpw(password.encode(), hashed)
    except Exception:
        return False


def create_jwt(user: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": user["user_id"],
        "email": user["email"],
        "org": user["org_id"],
        "adm": user["is_admin"],
        "typ": "access",
        "exp": expire
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_user_by_email(email: str):
    conn = db_connect()
    cur = conn.cursor()
    cur.execute(
        """
        SELECT user_id, org_id, email, full_name, password_hash, is_admin
        FROM auth.users
        WHERE email = %s
        """,
        (email,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return None

    return {
        "user_id": row[0],
        "org_id": row[1],
        "email": row[2],
        "full_name": row[3],
        "password_hash": row[4],
        "is_admin": row[5],
    }


# ---------------------------------------------------------
# Dependencies
# ---------------------------------------------------------
def get_current_user(request: Request) -> UserOut:
    token = None

    # 1) Cookie HttpOnly
    if "casamx_session" in request.cookies:
        token = request.cookies["casamx_session"]

    # 2) Header Authorization
    if not token:
        auth = request.headers.get("Authorization")
        if auth and auth.startswith("Bearer "):
            token = auth.split(" ", 1)[1]

    if not token:
        raise HTTPException(status_code=401, detail="Missing token")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return UserOut(
            user_id=payload["sub"],
            org_id=payload["org"],
            email=payload["email"],
            full_name="",  # si besoin d’étendre
            is_admin=payload.get("adm", False),
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------------------------------------------------------
# Routes
# ---------------------------------------------------------
@router.post("/auth/login", response_model=LoginResponse)
def login(
    response: Response,
    username: str = Form(...),
    password: str = Form(...)
):
    user = get_user_by_email(username)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(password, user["password_hash"].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_jwt(user)

    # Cookie HttpOnly sécurisé
    response.set_cookie(
        key="casamx_session",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        domain=".casametrix.com",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return LoginResponse(
        access_token=token,
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        **{k: user[k] for k in ["org_id", "user_id", "email", "full_name", "is_admin"]}
    )


@router.get("/auth/me", response_model=UserOut)
def me(current_user: UserOut = Depends(get_current_user)):
    return current_user


@router.post("/auth/logout")
def logout(response: Response):
    response.set_cookie(
        "casamx_session",
        "",
        httponly=True,
        secure=True,
        samesite="none",
        domain=".casametrix.com",
        max_age=0,
    )
    return {"ok": True}
