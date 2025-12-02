# app/core/db.py
from __future__ import annotations

import os
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

# =====================================================
# Récupération de DATABASE_URL (sync) depuis l'env
# =====================================================
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL manquant dans l'environnement (voir /etc/casamx-api.env)")

# On convertit l'URL sync "postgresql://" en URL async pour SQLAlchemy
# Exemple :
#   postgresql://user:pass@host:5432/db
# devient :
#   postgresql+asyncpg://user:pass@host:5432/db
if DATABASE_URL.startswith("postgresql://"):
    ASYNC_DATABASE_URL = "postgresql+asyncpg://" + DATABASE_URL[len("postgresql://") :]
else:
    # Si un jour tu mets directement une URL déjà async, on la laisse telle quelle
    ASYNC_DATABASE_URL = DATABASE_URL

# =====================================================
# Engine / Session async SQLAlchemy
# =====================================================
engine = create_async_engine(
    ASYNC_DATABASE_URL,
    future=True,
    echo=False,  # passe à True si tu veux voir toutes les requêtes SQL
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)


# =====================================================
# Dépendance FastAPI : get_session()
# =====================================================
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Fournit une AsyncSession SQLAlchemy pour les routes async
    (ex : app.routers.auth, app.routers.billing, etc.).
    """
    async with AsyncSessionLocal() as session:
        yield session
