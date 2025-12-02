from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

# ---------- Users / Auth ----------
class UserCtx(BaseModel):
    user_id: str = Field(default="admin")
    org_id: Optional[str] = Field(default="ORG1")
    email: EmailStr
    is_admin: bool = False

# ---------- Properties ----------
class PropertyOut(BaseModel):
    id: str
    address: str
    city: Optional[str] = None
    country: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    source: Optional[str] = None

class SearchResponse(BaseModel):
    total: int
    page: int
    page_size: int
    items: List[PropertyOut]

# ---------- Simulate ----------
class SimulateInput(BaseModel):
    property_id: Optional[str] = None
    value: float = 100.0
    years: int = 10

class SimulateOutput(BaseModel):
    property_id: Optional[str] = None
    projected_value: float

# ---------- ESG ----------
class ESGMetric(BaseModel):
    name: str
    score: float

class ESGReportInput(BaseModel):
    property_id: str

class ESGReport(BaseModel):
    property_id: str
    metrics: List[ESGMetric]
    overall: float
