"""Administrator: review and verify cooperatives (FR5)."""
from datetime import datetime
from typing import Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session

from backend.app.models.schemas import Cooperative, User


def list_cooperatives(db: Session, status: Optional[str] = None):
    q = db.query(Cooperative).join(User)
    if status == "pending":
        q = q.filter(Cooperative.is_verified.is_(False))
    elif status == "verified":
        q = q.filter(Cooperative.is_verified.is_(True))
    return q.order_by(Cooperative.is_verified, User.created_at.desc()).all()


def verify(db: Session, coop_id: int) -> Cooperative:
    coop = db.get(Cooperative, coop_id)
    if not coop:
        raise HTTPException(404, "Cooperative not found")
    coop.is_verified = True
    coop.verified_at = datetime.utcnow()
    db.commit()
    db.refresh(coop)
    return coop
