from __future__ import annotations
import os
from pydantic import BaseModel

class Settings(BaseModel):
    secret_key: str = os.getenv("CASAMX_SECRET_KEY", "devsecret-change-me")
    admin_user: str = os.getenv("CASAMX_ADMIN_USER", "admin@casametrix.com")
    admin_pass: str = os.getenv("CASAMX_ADMIN_PASS", "GoBusiness2025@")
    token_ttl_seconds: int = int(os.getenv("CASAMX_TOKEN_TTL", "43200"))  # 12h

settings = Settings()
