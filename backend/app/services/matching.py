from typing import Optional
from sqlalchemy.orm import Session
from backend.app.models.schemas import Cooperative, MaterialListing

def match_suppliers(db: Session, material: str, quantity: float, location: Optional[str] = None, limit: int = 20):
    candidates = (db.query(MaterialListing).join(Cooperative)
                  .filter(Cooperative.is_verified.is_(True), 
                          MaterialListing.name.ilike(f"%{material.strip()}%"), 
                          MaterialListing.quantity >= quantity)
                   .all())
    results = []
    for item in candidates:
        score, reasons = 50, [f"Has {item.quantity:g} kg, enough for {quantity:g} kg"]
        if location and item.location and location.strip().lower() in item.location.lower():
            score += 30
            reasons.append("Same location")
        if item.availability == "Availability":
            score += 20
            reasons.append("Well stocked")
        results.append({"listing": item, "score": score, "reasons": reasons})
    results.sort(key=lambda r: (-r["score"], r["listing"].price if r["listing"].price is not None else float("inf")))
    return results[:limit]


                  