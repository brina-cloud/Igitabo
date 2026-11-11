from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.app.models.schemas import Cooperative, Manufacturer, MaterialListing, MaterialRequest, RequestIn, RequestOut, User

PENDING, ACCEPTED, REJECTED = "Pending", "Accepted", "Rejected"

def create(db: Session, manufacturer: Manufacturer, data: RequestIn) -> MaterialRequest:
    listing = db.get(MaterialListing, data.listing_id)
    if not listing:
        raise HTTPException(404, "Listing not found")
    if not listing.cooperative.is_verified:
        raise HTTPException(400, "This cooperative is not verified")
    if data.quantity > listing.quantity:
        raise HTTPException(400, f"Only {listing.quantity:g} kg is available")
    request = MaterialRequest(manufacturer_id=manufacturer.id, cooperative_id=listing.cooperative_id, listing_id=listing.id, quantity=data.quantity, message=(data.message or "").strip() or None, status=PENDING)
    db.add(request)
    db.commit()
    db.refresh(request)
    return request
    