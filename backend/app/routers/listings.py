from typing import List, Optional

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.schemas import Cooperative, ListingIn, ListingOut, ProfileIn, ProfileOut, User
from backend.app.services import auth as auth_service
from backend.app.services import listings as listing_service

router = APIRouter(prefix="/api", tags=["listings"])

@router.get("/cooperative/profile", response_model=ProfileOut)
def get_profile(coop: Cooperative = Depends(auth_service.current_cooperative)):
    return coop


@router.put("/cooperative/profile", response_model=ProfileOut)
def save_profile(data: ProfileIn, coop: Cooperative = Depends(auth_service.current_cooperative),
                 db: Session = Depends(get_db)):
    return listing_service.update_profile(db, coop, data)
    
@router.get("/listings/mine", response_model=List[ListingOut])
def my_listings(coop: Cooperative = Depends(auth_service.current_cooperative), 
                db: Session = Depends(get_db)):
    return listing_service.mine(db, coop)

@router.post("/listings", response_model=ListingOut, status_code=201)
def add_listing(data: ListingIn, coop: Cooperative = Depends(auth_service.current_cooperative),
                db: Session = Depends(get_db)):
    return listing_service.create(db, coop, data)

@router.put("/listings/{listing_id}", response_model=ListingOut)
def edit_listing(listing_id: int, data: ListingIn, coop: Cooperative = Depends(auth_service.current_cooperative),
                 db: Session = Depends(get_db)):
    return listing_service.update(db, coop, listing_id, data)

@router.get("/listings/search", response_model=List[ListingOut])
def search_listings(material: Optional[str] = None,
                    category: Optional[str] = None,
                    location: Optional[str] = None,
                    availability: Optional[str] = None,
                    _: User = Depends(auth_service.current_user),
                    db: Session = Depends(get_db)):
    return listing_service.search(db, material, category, location, availability)\

@router.delete("/listings/{listing_id}", status_code=204)
def remove_listing(listing_id: int, coop: Cooperative = Depends(auth_service.current_cooperative),
                     db: Session = Depends(get_db)):
    listing_service.delete(db, coop, listing_id)
    return Response(status_code=204)

