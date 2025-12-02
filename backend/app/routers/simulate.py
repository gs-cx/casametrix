from __future__ import annotations
from fastapi import APIRouter, Depends
from app.core.auth_inject import inject_user
from app.schemas import SimulateInput, SimulateOutput, UserCtx
router = APIRouter(prefix="/simulate", tags=["simulate"])
@router.post("/run", response_model=SimulateOutput)
def run_simulation(payload: SimulateInput, user: UserCtx = Depends(inject_user)) -> SimulateOutput:
    value = float(payload.value)
    years = int(payload.years)
    projected = round(value * (1.03 ** years), 2)
    return SimulateOutput(property_id=payload.property_id, projected_value=projected)
