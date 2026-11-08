from typing import List, Optional

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.schemas import Cooperative, ListingIn, ListingOut, ProfileIn, ProfileOut, User
from backend.app.services import auth as auth_service
from backend.app.services import listings as listing_service

router = APIRouter(prefix="/api", tags=["listings"])

