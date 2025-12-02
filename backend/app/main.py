# ========================================================================
# Casametrix API - main.py
# Production-ready version with strict CORS, BAN endpoints and health check
# ========================================================================

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from datetime import datetime
import asyncpg

# ------------------------------------------------------
# CONFIG
# ------------------------------------------------------

API_ENV = os.getenv("API_ENV", "prod")
DATABASE_URL = os.getenv("DATABASE_URL")

BAN_API_URL = "https://api-adresse.data.gouv.fr/search/"

# ------------------------------------------------------
# DB CONNECTION (async)
# ------------------------------------------------------

async def get_connection():
    return await asyncpg.connect(DATABASE_URL)

# ------------------------------------------------------
# MODELS
# ------------------------------------------------------

class BanLogRequest(BaseModel):
    label: str
    postal_code: str
    city: str
    lat: float
    lng: float

# ------------------------------------------------------
# APP
# ------------------------------------------------------

app = FastAPI()

# ------------------------------------------------------
# CORS – STRICT PRODUCTION CONFIG
# ------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://casametrix.com",
        "https://www.casametrix.com",
        "http://localhost:5173",   # utile pour dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------
# HEALTH
# ------------------------------------------------------

@app.get("/health")
async def health():
    return {"status": "ok", "env": API_ENV}

# ------------------------------------------------------
# BAN AUTOCOMPLETE – PUBLIC ENDPOINT
# ------------------------------------------------------

@app.get("/addresses/ban-autocomplete")
async def ban_autocomplete(q: str):
    # Forward query to BAN
    async with httpx.AsyncClient(timeout=5) as client:
        response = await client.get(BAN_API_URL, params={"q": q})

    if response.status_code != 200:
        raise HTTPException(502, "BAN API error")

    return response.json()

# ------------------------------------------------------
# BAN LOG – INSERT ADDRESS INTO public.addresses
# ------------------------------------------------------

@app.post("/addresses/ban-log")
async def ban_log(payload: BanLogRequest):

    # non authentifié → retour 401 si future version
    # ici PUBLIC pour tests et invités
    try:
        conn = await get_connection()
        row = await conn.fetchrow(
            """
            INSERT INTO public.addresses (address, postal_code, city, lat, lng)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, address, postal_code, city, lat, lng, created_at;
            """,
            payload.label,
            payload.postal_code,
            payload.city,
            payload.lat,
            payload.lng,
        )
        await conn.close()
        return dict(row)
    except Exception as e:
        print("DB insert error:", e)
        raise HTTPException(500, "Database error")

# ------------------------------------------------------
# SEARCH IN GOLDEN INDEX
# ------------------------------------------------------

@app.get("/addresses/search")
async def search_address(q: str):
    try:
        conn = await get_connection()
        rows = await conn.fetch(
            """
            SELECT id, address, postal_code, city, lat, lng, created_at
            FROM public.addresses
            WHERE LOWER(address) LIKE LOWER('%' || $1 || '%')
            ORDER BY created_at DESC
            LIMIT 20;
            """,
            q,
        )
        await conn.close()
        return {"results": [dict(r) for r in rows]}
    except Exception as e:
        print("Search error:", e)
        raise HTTPException(500, "Database error")
