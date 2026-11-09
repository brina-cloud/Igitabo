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

