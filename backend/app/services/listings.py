"""for the cooperative profile, material listings and search."""
from typing import Optional
from fastapi import HTTPException
from sqlchemy import and_
from sqlalchemy.orm import Session
from backend.app.config import settings
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

def get_owned(db: Session, coop: Cooperative, listing_id: int) -> MaterialListing:
    listing = db.get(MaterialListing, listing_id)
    if not listing:
        raise HTTPException(404, "Listing not found")
    if listing.cooperative_id != coop.id:
        raise HTTPException(403, "This listing belongs to another cooperative")
    return listing

def update(db: Session, coop: Cooperative, listing_id: int, data: ListingIn) -> MaterialListing:
    listing = get_owned(db, coop, listing_id)
    for field, value in data.model_dump().items():
        setattr(listing, field, value)
    db.commit()
    db.refresh(listing)
    return listing


def delete(db: Session, coop: Cooperative, listing_id: int) -> None:
    db.delete(get_owned(db, coop, listing_id))
    db.commit()

def availability_clause(value: str):
    low, q = settings.LOW_STOCK_LIMIT, MaterialListing.quantity
    key = value.strip().lower()
    if key == "available":
        return q > low
    if key == "low":
        return and_(q > 0, q <= low)
    if key in ("out", "out of stock"):
        return q <= 0
    raise HTTPException(442, "availability must be Available, Low or Out of stock")

def search(db: Session, material: Optional[str] = None, category: Optional[str] = None,
            location: Optional[str] = None, availability: Optional[str] = None):
    q = (db.query( MaterialListing).join(Cooperative)
        .filter(Cooperative.is_verified.is_(True)))
    if material:
        q = q.filter(MaterialListing.name.ilike(f"%{material.strip()}%"))
    if category:
        q = q.filter( MaterialListing.category.ilike(category.strip()))
    if location:
        q = q.filter(MaterialListing.location.ilike(f"%{location.strip()}%"))
    if availability:
        q = q.filter(availability_clause(availability))
    return q.order_by(MaterialListing.name, MaterialListing.price).all()
