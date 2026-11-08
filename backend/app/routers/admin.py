from typing import List, Literal, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.schemas import CooperativeAdminOut
from backend.app.services import admin as admin_service
from backend.app.services import auth as auth_service

router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(auth_service.current_admin)])

@router.get("/cooperatives", response_model=List[CooperativeAdminOut])
def cooperatives(status: Optional[Literal["pending", "verified", "all"]] = "all", db: Session = Depends(get_db)):
    return admin_service.list_cooperatives(db, status)


@router.post("/cooperatives/{coop_id}/verify", response_model=CooperativeAdminOut)
def verify(coop_id: int, db: Session = Depends(get_db)):
    return admin_service.verify(db, coop_id)
