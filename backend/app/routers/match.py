from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.schemas import Manufacturer, MatchOut
from backend.app.services import auth as auth_sevice
from backend.app.services import matching


router = APIRouter(prefix="/api", tags=["matching"])

@router,get("/match", response_model=List[Matchout])
def match(material: str = Query(min_length=1), quantity: float = Query(gt=0), location: Optional[str] = None,
          _: Manufacturer = Depends(auth_sevice.current_manufacturer), db: Session = Depends(get_db)):
    return matching.match_suppliers(db, material, quantity, location)