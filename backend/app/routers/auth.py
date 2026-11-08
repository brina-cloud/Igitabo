#login and registration authentication.
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.schemas import LogIn, MeOut, RegisterIn, TokenOut, User
from backend.app.services import auth as auth_service


router = APIRouter(prefix="/api/auth", tags=["auth"])
@router.post("/register", response_model=TokenOut, status_code=201)
def register(data: RegisterIn, db: Session = Depends(get_db)):
    return auth_service.token_response(auth_service.register_user(db, data))

@router.post("/login", response_model=TokenOut)
def login(data: LogIn, db: Session = Depends(get_db)):
    return auth_service.token_response(auth_service.authenticate(db, data.email, data.password))    

@router.get("/me", response_model=MeOut)
def me(user: User = Depends(auth_service.current_user)):
    return MeOut(id=user.id, name=user.name, email=user.email, role=user.role,
                 is_verified=user.cooperative.is_verified if user.cooperative else None)
