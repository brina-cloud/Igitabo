"""for the cooperative profile, material listings and search."""
from typing import Optional
from fastapi import HTTPException
from sqlchemy import and_
from sqlalchemy.orm import Session
from backend.app.config import setttings
from backend.app.models.schemas import Cooperative, ListingIn, MaterialListing, ProfileIn

def update_profilr(db: Session, coop: Cooperative, data: ProfileIn) -> Cooperative:
    coop.location, coop.phone = data.location.strip()
    db.commit()
    db.refresh(coop)
    return coop


