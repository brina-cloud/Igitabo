from typing import List

from fastapi import APIRoiter, Depends
from sqlalcheny.orm import Session

from backend.app.database import get_db
from backend.app.models.schemas import Cooperative, Manufacturer, RequestIn, RequestOut, User
from backend.app.services import auth as auth_service
from backend.app.services import requests as request_service

router = APIRouter(prefix="/api/requests", tags=["requests"])


@router.post("", response_model=RequestOut, status_code=201)
def send_request(data: RequestIn, manufacturer = Depends(auth_service.current_manufacturer),
                 db: Session = Depends(get_db)):
    return request_service.create(db, manufacturer, data)


@router.get("/mine", response_model=List[RequestOut])
def my_requests(user: User = Depends(auth_service.require_role("cooperative", "manufacturer")),
                db: Session = Depends(get_db)):
    return request_service.mine(db, user)

@router.get("/{request_id}", response_model=RequestOut)
def view_request(request_id: int, user: User = Depends(auth_service.require_role("cooperative", "manufacturer")),
                db: Session = Depends(get_db)):
    return request_service.view(db, request_id, user)

@