# app/routers/auth.py
from __future__ import annotations

import os
import secrets
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_session
from app.core.security import (
    User,
    get_current_user,
    verify_password,
    hash_password,
    create_access_token,
)

router = APIRouter()

CASAMETRIX_ENV = os.getenv("CASAMETRIX_ENV", "prod")
IS_PROD = CASAMETRIX_ENV == "prod"


# =========================
# Schémas
# =========================
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class MeResponse(BaseModel):
    id: str
    email: EmailStr
    org_id: str
    is_active: bool = True


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    token: str
    new_password: str


class ForgotPasswordResponse(BaseModel):
    ok: bool
    # En production on ne renverra PAS le token, même si on le génère et l'enregistre.
    reset_token: Optional[str] = None


class SimpleOKResponse(BaseModel):
    ok: bool


# =========================
# Helpers internes
# =========================
def _validate_password_strength(password: str) -> None:
    """
    Validation simple de complexité de mot de passe.
    On pourra affiner avec des règles plus strictes plus tard.
    """
    if len(password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le mot de passe doit contenir au moins 8 caractères.",
        )


# Dummy hash pour limiter la différence de timing
# quand l'email n'existe pas (mitigation brute force basique).
DUMMY_HASH = hash_password("Casametrix_dummy_password_for_timing")


# =========================
# /auth/login
# =========================
@router.post("/login", response_model=TokenResponse, tags=["auth"])
async def login(body: LoginRequest, session: AsyncSession = Depends(get_session)):
    """
    Authentifie l'utilisateur (email+password) et retourne un JWT.
    Schéma côté DB :
      - table public.users(
            id uuid,
            email text unique,
            password_hash text,
            org_id uuid,
            is_active bool,
            plan_code text,
            billing_period text,
            subscription_started_at timestamptz,
            subscription_renews_at timestamptz,
            reset_token text,
            reset_token_expires_at timestamptz
        )
    """
    sql = text(
        """
        SELECT
            id::text AS id,
            email,
            password_hash,
            org_id::text AS org_id,
            COALESCE(is_active, true) AS is_active
        FROM public.users
        WHERE lower(email) = lower(:email)
        LIMIT 1
        """
    )
    row = (await session.execute(sql, {"email": body.email})).mappings().one_or_none()

    # Réponse d'erreur générique (même message pour éviter de distinguer les cas)
    invalid_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Identifiants invalides",
    )

    if not row:
        # Email inexistant → on brûle du temps avec un bcrypt sur un hash dummy
        verify_password(body.password, DUMMY_HASH)
        raise invalid_exc

    if not row["is_active"]:
        # On pourrait renvoyer un message plus précis, mais on reste générique pour éviter le user enumeration.
        raise invalid_exc

    if not verify_password(body.password, row["password_hash"]):
        raise invalid_exc

    token = create_access_token(
        user_id=row["id"], org_id=row["org_id"], email=row["email"]
    )
    return TokenResponse(access_token=token)


# =========================
# /auth/me
# =========================
@router.get("/me", response_model=MeResponse, tags=["auth"])
async def me(current: User = Depends(get_current_user)):
    return MeResponse(
        id=current.id,
        email=current.email,
        org_id=current.org_id,
        is_active=current.is_active,
    )


# =========================
# /auth/register
# =========================
@router.post("/register", response_model=TokenResponse, tags=["auth"])
async def register(body: RegisterRequest, session: AsyncSession = Depends(get_session)):
    """
    Inscription d'un nouvel utilisateur :
      - email + mot de passe
      - plan FREE par défaut (plan_code='free', billing_period='credits')
      - org_id généré automatiquement
      - renvoie directement un JWT
    """

    _validate_password_strength(body.password)

    # 1) Vérifier si l’email existe déjà
    check_sql = text(
        """
        SELECT id::text AS id, email
        FROM public.users
        WHERE lower(email) = lower(:email)
        LIMIT 1
        """
    )
    existing = (
        await session.execute(check_sql, {"email": body.email})
    ).mappings().one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un compte existe déjà avec cet email.",
        )

    # 2) Hasher le mot de passe
    pwd_hash = hash_password(body.password)

    # 3) Créer l’utilisateur FREE
    insert_sql = text(
        """
        INSERT INTO public.users (
            id,
            email,
            password_hash,
            org_id,
            is_active,
            plan_code,
            billing_period,
            subscription_started_at,
            subscription_renews_at
        )
        VALUES (
            gen_random_uuid(),
            :email,
            :password_hash,
            gen_random_uuid(),
            TRUE,
            'free',
            'credits',
            now(),
            now() + interval '90 days'
        )
        RETURNING id::text AS id, email, org_id::text AS org_id
        """
    )
    row = (
        await session.execute(
            insert_sql,
            {
                "email": body.email,
                "password_hash": pwd_hash,
            },
        )
    ).mappings().one()

    await session.commit()

    # 4) Générer un token directement
    token = create_access_token(
        user_id=row["id"], org_id=row["org_id"], email=row["email"]
    )

    return TokenResponse(access_token=token)


# =========================
# /auth/forgot-password
# =========================
@router.post(
    "/forgot-password",
    response_model=ForgotPasswordResponse,
    tags=["auth"],
)
async def forgot_password(
    body: ForgotPasswordRequest,
    session: AsyncSession = Depends(get_session),
):
    """
    Demande de réinitialisation de mot de passe.
    - Génère un reset_token + expiration (ex: 1h)
    - En production : on n'expose JAMAIS le token dans la réponse.
    """

    # Rechercher l’utilisateur (mais même si non trouvé, on répond ok pour ne pas leak)
    find_sql = text(
        """
        SELECT id::text AS id
        FROM public.users
        WHERE lower(email) = lower(:email)
        LIMIT 1
        """
    )
    row = (
        await session.execute(find_sql, {"email": body.email})
    ).mappings().one_or_none()

    if not row:
        # Réponse uniforme pour éviter le user enumeration
        return ForgotPasswordResponse(ok=True, reset_token=None)

    reset_token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(hours=1)

    update_sql = text(
        """
        UPDATE public.users
        SET reset_token = :token,
            reset_token_expires_at = :expires_at
        WHERE id = :id
        """
    )
    await session.execute(
        update_sql,
        {
            "token": reset_token,
            "expires_at": expires_at,
            "id": row["id"],
        },
    )
    await session.commit()

    # En PROD : on n'expose pas le token. Il sera consommé par un lien mail.
    if IS_PROD:
        return ForgotPasswordResponse(ok=True, reset_token=None)

    # En DEV : on renvoie le token pour tests (curl / Postman)
    return ForgotPasswordResponse(ok=True, reset_token=reset_token)


# =========================
# /auth/reset-password
# =========================
@router.post(
    "/reset-password",
    response_model=SimpleOKResponse,
    tags=["auth"],
)
async def reset_password(
    body: ResetPasswordRequest,
    session: AsyncSession = Depends(get_session),
):
    """
    Réinitialise le mot de passe à partir du couple (email, token).
    - Vérifie que le token correspond et n’est pas expiré
    - Met à jour password_hash
    - Efface reset_token / reset_token_expires_at
    """
    _validate_password_strength(body.new_password)

    # 1) Vérifier le token
    check_sql = text(
        """
        SELECT id::text AS id
        FROM public.users
        WHERE
            lower(email) = lower(:email)
            AND reset_token = :token
            AND reset_token_expires_at IS NOT NULL
            AND reset_token_expires_at > now()
        LIMIT 1
        """
    )
    row = (
        await session.execute(
            check_sql,
            {"email": body.email, "token": body.token},
        )
    ).mappings().one_or_none()

    if not row:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Lien de réinitialisation invalide ou expiré.",
        )

    # 2) Hasher le nouveau mot de passe
    new_hash = hash_password(body.new_password)

    # 3) Mettre à jour l’utilisateur
    update_sql = text(
        """
        UPDATE public.users
        SET
            password_hash = :password_hash,
            reset_token = NULL,
            reset_token_expires_at = NULL
        WHERE id = :id
        """
    )
    await session.execute(
        update_sql,
        {
            "password_hash": new_hash,
            "id": row["id"],
        },
    )
    await session.commit()

    return SimpleOKResponse(ok=True)
