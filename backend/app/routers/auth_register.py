from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
import psycopg2
import bcrypt
import uuid
import os

router = APIRouter()

DATABASE_URL = os.getenv("DATABASE_URL")


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/auth/register")
def register_user(payload: RegisterRequest):
    email = payload.email.strip().lower()
    password = payload.password

    if len(password) < 8:
        raise HTTPException(status_code=400, detail="Le mot de passe doit contenir au moins 8 caractères.")

    # Connexion PostgreSQL
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        # Vérifier si email déjà existant
        cur.execute("SELECT id FROM public.users WHERE email = %s", (email,))
        existing = cur.fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Cet utilisateur existe déjà.")

        # Hachage du mot de passe
        hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        # Générer un UUID pour l’utilisateur
        user_id = str(uuid.uuid4())

        # Insérer en base
        cur.execute(
            """
            INSERT INTO public.users (id, org_id, email, password_hash)
            VALUES (%s, %s, %s, %s)
            """,
            (
                user_id,
                "00000000-0000-0000-0000-000000000000",  # organisation par défaut
                email,
                hashed,
            ),
        )

        conn.commit()
        cur.close()
        conn.close()

        return {"message": "Utilisateur créé avec succès.", "user_id": user_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur serveur: {str(e)}")
