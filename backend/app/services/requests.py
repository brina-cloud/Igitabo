from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.app.models.schemas import Cooperative, Manufacturer, MaterialListing, MaterialRequest, RequestIn, RequestOut, User

PENDING, ACCEPTED, REJECTED = "Pending", "Accepted", "Rejected"
