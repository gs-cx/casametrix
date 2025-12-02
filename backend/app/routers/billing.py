# app/routers/billing.py
from __future__ import annotations

from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_session
from app.core.security import (
    User,
    get_current_user,
)

router = APIRouter()

CREDITS_TTL_DAYS = 90  # crédits valables 90 jours


# =========================
# Schémas Pydantic
# =========================
class BillingPlanOut(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    price_cents: int
    currency: str
    period: str
    credits: int


class CreditsPack(BaseModel):
    delta: int
    created_at: datetime
    expires_at: Optional[datetime] = None
    reason: Optional[str] = None


class BillingSummary(BaseModel):
    plan_code: str
    plan_name: Optional[str] = None
    period: Optional[str] = None
    credits_total: int
    next_expiry: Optional[datetime] = None
    packs: List[CreditsPack] = []


class SubscribeRequest(BaseModel):
    plan_code: str


# =========================
# Helpers SQL
# =========================
async def _get_plan(session: AsyncSession, plan_code: str) -> Optional[dict]:
    sql = text("""
        SELECT code, name, description, price_cents, currency, period, credits
        FROM public.billing_plans
        WHERE code = :code
          AND is_active = TRUE
        LIMIT 1
    """)
    row = (await session.execute(sql, {"code": plan_code})).mappings().one_or_none()
    return row


async def _get_user_plan_and_credits(session: AsyncSession, user_id: str) -> BillingSummary:
    # 1) Plan actuel de l'utilisateur
    sql_user = text("""
        SELECT
            u.plan_code,
            u.billing_period AS period,
            p.name AS plan_name
        FROM public.users u
        LEFT JOIN public.billing_plans p
          ON p.code = u.plan_code
        WHERE u.id = :user_id
        LIMIT 1
    """)
    user_row = (await session.execute(sql_user, {"user_id": user_id})).mappings().one_or_none()

    if not user_row:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    plan_code = user_row["plan_code"] or "free"
    period = user_row["period"]
    plan_name = user_row["plan_name"]

    # 2) Packs de crédits valides (>=0 et non expirés)
    sql_packs = text("""
        SELECT
            delta,
            created_at,
            expires_at,
            reason
        FROM public.credits_ledger
        WHERE user_id = :user_id
          AND delta <> 0
          AND (expires_at IS NULL OR expires_at > now())
        ORDER BY created_at DESC
    """)
    rows = (await session.execute(sql_packs, {"user_id": user_id})).mappings().all()

    packs = []
    credits_total = 0
    next_expiry: Optional[datetime] = None

    for r in rows:
        delta = int(r["delta"])
        credits_total += delta

        pack = CreditsPack(
            delta=delta,
            created_at=r["created_at"],
            expires_at=r["expires_at"],
            reason=r.get("reason"),
        )
        packs.append(pack)

        if r["expires_at"] is not None:
            if next_expiry is None or r["expires_at"] < next_expiry:
                next_expiry = r["expires_at"]

    if credits_total < 0:
        credits_total = 0  # par sécurité

    return BillingSummary(
        plan_code=plan_code,
        plan_name=plan_name,
        period=period,
        credits_total=credits_total,
        next_expiry=next_expiry,
        packs=packs,
    )


async def _add_credits(
    session: AsyncSession,
    *,
    user_id: str,
    plan_code: str,
    credits: int,
    reason: str,
) -> None:
    """
    Ajoute un pack de crédits avec une durée de validité de 90 jours.
    """
    if credits <= 0:
        return

    expires_at = datetime.utcnow() + timedelta(days=CREDITS_TTL_DAYS)

    sql = text("""
        INSERT INTO public.credits_ledger (user_id, plan_code, delta, reason, created_at, expires_at)
        VALUES (:user_id, :plan_code, :delta, :reason, now(), :expires_at)
    """)
    await session.execute(
        sql,
        {
            "user_id": user_id,
            "plan_code": plan_code,
            "delta": credits,
            "reason": reason,
            "expires_at": expires_at,
        },
    )


# =========================
# Routes
# =========================

@router.get("/plans", response_model=List[BillingPlanOut], tags=["billing"])
async def list_plans(session: AsyncSession = Depends(get_session)):
    """
    Liste les plans actifs (free, starter, pro, business, etc.).
    """
    sql = text("""
        SELECT code, name, description, price_cents, currency, period, credits
        FROM public.billing_plans
        WHERE is_active = TRUE
        ORDER BY sort_order ASC, price_cents ASC
    """)
    rows = (await session.execute(sql)).mappings().all()
    return [
        BillingPlanOut(
            code=r["code"],
            name=r["name"],
            description=r["description"],
            price_cents=r["price_cents"],
            currency=r["currency"],
            period=r["period"],
            credits=r["credits"],
        )
        for r in rows
    ]


@router.get("/summary", response_model=BillingSummary, tags=["billing"])
async def billing_summary(
    current: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """
    Résumé facturation de l'utilisateur courant :
    - plan actuel
    - nombre de crédits restants
    - prochaine date d'expiration (si plusieurs packs, on renvoie le plus proche).
    """
    summary = await _get_user_plan_and_credits(session, user_id=current.id)
    return summary


@router.post("/subscribe", response_model=BillingSummary, tags=["billing"])
async def subscribe_plan(
    body: SubscribeRequest,
    current: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """
    Souscrit à un plan (starter, pro, business, ...).
    Version MVP : on suppose que le paiement est déjà validé côté front/Stripe.
    - Met à jour le plan de l'utilisateur
    - Crée/Met à jour une subscription
    - Ajoute un pack de crédits valable 90 jours
    """
    # 1) Charger le plan
    plan = await _get_plan(session, body.plan_code)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan introuvable")

    if plan["credits"] <= 0 and plan["period"] != "free":
        raise HTTPException(status_code=400, detail="Ce plan ne contient pas de crédits")

    # 2) Période d'abonnement (MVP : monthly ou annual)
    now = datetime.utcnow()
    if plan["period"] == "monthly":
        period_end = now + timedelta(days=30)
    elif plan["period"] == "annual":
        period_end = now + timedelta(days=365)
    elif plan["period"] == "free":
        period_end = now
    else:
        # fallback générique
        period_end = now + timedelta(days=30)

    # 3) Mettre à jour l'utilisateur (plan + dates)
    sql_update_user = text("""
        UPDATE public.users
        SET
            plan_code = :plan_code,
            billing_period = :billing_period,
            subscription_started_at = COALESCE(subscription_started_at, now()),
            subscription_renews_at = :renews_at
        WHERE id = :user_id
    """)
    await session.execute(
        sql_update_user,
        {
            "plan_code": plan["code"],
            "billing_period": plan["period"],
            "renews_at": period_end,
            "user_id": current.id,
        },
    )

    # 4) Créer une subscription (simple, pas d'upsert compliqué pour le MVP)
    sql_insert_sub = text("""
        INSERT INTO public.subscriptions (
            user_id, plan_code, started_at, current_period_start, current_period_end, status
        )
        VALUES (:user_id, :plan_code, now(), :start, :end, 'active')
    """)
    await session.execute(
        sql_insert_sub,
        {
            "user_id": current.id,
            "plan_code": plan["code"],
            "start": now,
            "end": period_end,
        },
    )

    # 5) Ajouter les crédits (valables 90 jours)
    await _add_credits(
        session,
        user_id=current.id,
        plan_code=plan["code"],
        credits=int(plan["credits"]),
        reason=f"Subscription {plan['code']}",
    )

    # 6) Commit
    await session.commit()

    # 7) Retourner un résumé à jour
    summary = await _get_user_plan_and_credits(session, user_id=current.id)
    return summary
