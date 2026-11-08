from typing import List, Literal, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.schemas import CooperativeAdminOut
from backend.app.services import admin as admin_service
from backend.app.services import auth as auth_service

router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(auth_service.current_admin)])

