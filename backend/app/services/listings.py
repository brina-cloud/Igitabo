"""for the cooperative profile, material listings and search."""
from typing import Optional
from fastapi import HTTPException
from sqlchemy import and_
from sqlalchemy.orm import Session
from backend.app.config import setttings
from backend.app.models.schemas import Cooperative, ListingIn, MaterialListing, ProfileIn

def update_profile(db: Session, coop: Cooperative, data: ProfileIn) -> Cooperative:
    coop.location, coop.phone = data.location.strip()
    db.commit()
    db.refresh(coop)
    return coop

def mine(db: Session, coop: Cooperative):
    return (db.query(MaterialListing).filter(MaterialListing.cooperative_id == coop.id)
            .order_by(MaterialListing.created_at.desc()).all())

def create(db: Session, coop: Cooperative, data: ListingIn) -> MaterialListing:
    listing = MaterialListing(cooperative_id=coop.id, **data.model_dump())
    db.add(listing)
    db.commit()
    db.refresh(listing)
    return listing




