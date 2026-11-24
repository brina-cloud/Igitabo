"""Passwords, tokens, registration, login and role checks (FR1, FR2)."""
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from backend.app.config import settings
from backend.app.database import get_db
from backend.app.models.schemas import Cooperative, Manufacturer, RegisterIn, User

_bearer = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode()[:72], bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode()[:72], hashed.encode())
    except ValueError:
        return False


def create_token(user: User) -> str:
    expires = datetime.now(timezone.utc) + timedelta(hours=settings.TOKEN_HOURS)
    payload = {"sub": str(user.id), "role": user.role, "exp": expires}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")


def token_response(user: User) -> dict:
    return {"access_token": create_token(user), "token_type": "bearer", "role": user.role, "name": user.name}


def register_user(db: Session, data: RegisterIn) -> User:
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(409, "This email is already registered")
    user = User(name=data.name.strip(), email=data.email, password_hash=hash_password(data.password), role=data.role)
    db.add(user)
    db.flush()  # gives user.id
    if data.role == "cooperative":
        db.add(Cooperative(user_id=user.id, location=data.location, phone=data.phone))
    else:
        db.add(Manufacturer(user_id=user.id, company_name=data.organisation or data.name,
                            location=data.location, phone=data.phone))
    db.commit()
    db.refresh(user)
    return user


def authenticate(db: Session, email: str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(401, "Wrong email or password")
    return user


def current_user(creds: HTTPAuthorizationCredentials = Depends(_bearer), db: Session = Depends(get_db)) -> User:
    if not creds:
        raise HTTPException(401, "Please log in")
    try:
        payload = jwt.decode(creds.credentials, settings.SECRET_KEY, algorithms=["HS256"])
        user = db.get(User, int(payload["sub"]))
    except (jwt.PyJWTError, KeyError, ValueError):
        raise HTTPException(401, "Your session has expired. Please log in again")
    if not user:
        raise HTTPException(401, "Account not found")
    return user


def require_role(*roles: str):
    """Role-based access: only users with one of these roles get through."""
    def checker(user: User = Depends(current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(403, "You do not have access to this function")
        return user
    return checker


def current_cooperative(user: User = Depends(require_role("cooperative"))) -> Cooperative:
    return user.cooperative


def current_manufacturer(user: User = Depends(require_role("manufacturer"))) -> Manufacturer:
    return user.manufacturer


current_admin = require_role("administrator")
