from __future__ import annotations

from typing import Generator
from fastapi import Request
from sqlalchemy.orm import Session

from app.db import SessionLocal


def set_rls_org(db: Session, org_id: int | None) -> None:
    # Ici tu peux SET une GUC ou faire un "set_config" côté Postgres si tu utilises des policies RLS
    # Exemple (si tu utilises pg): db.execute(text("select set_config('casamx.org_id', :org, true)"), {"org": org_id})
    pass


class DBSessionWithRLS:
    """Dépendance DB qui reçoit *Request sans Query/Body/Path* (important pour Pydantic v2)."""

    def __init__(self, session_factory=SessionLocal):
        self.session_factory = session_factory

    def __call__(self, request: Request) -> Generator[Session, None, None]:
        db: Session = self.session_factory()
        try:
            user = request.state.user if hasattr(request.state, "user") else None
            set_rls_org(db, getattr(user, "org_id", None) if user else None)
            yield db
        finally:
            db.close()


db_dep = DBSessionWithRLS()

