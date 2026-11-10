from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.schemas import Manufacturer, MatchOut
from backend.app.services import auth as auth_sevice
from backend.app.services import matching


router = APIRouter(prefix="/api", tags=["matching"])
