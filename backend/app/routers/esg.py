from __future__ import annotations

from fastapi import APIRouter, Depends

from app.core.auth_inject import inject_user
from app.schemas import ESGReportInput, ESGReport, ESGMetric, UserCtx

router = APIRouter(prefix="/esg", tags=["esg"])


@router.post("/report", response_model=ESGReport)
def build_report(
    payload: ESGReportInput,
    user: UserCtx = Depends(inject_user),
) -> ESGReport:
    """
    Rapport ESG déterministe de démonstration.
    - Fournit `score` pour chaque métrique (requis par ESGMetric)
    - Fournit `overall` (requis par ESGReport)
    - Conserve des unités Unicode si le schéma les impose (kWh/m², m³, kgCO2e/m²)
    """
    metrics = [
        ESGMetric(name="energy_intensity", value=123.4, unit="kWh/m²",   score=78.0),
        ESGMetric(name="water_use",        value=45.6,  unit="m³",       score=82.0),
        ESGMetric(name="carbon_intensity", value=12.3,  unit="kgCO2e/m²", score=90.0),
    ]

    overall = round(sum(m.score for m in metrics) / len(metrics), 2)

    return ESGReport(
        property_id=payload.property_id,
        metrics=metrics,
        overall=overall,
    )
