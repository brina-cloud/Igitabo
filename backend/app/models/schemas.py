import re
from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from backend.app.config import settings
from backend.app.database import Base



class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False)  # cooperative | manufacturer | administrator
    language = Column(String(5), default="en")
    created_at = Column(DateTime, default=datetime.utcnow)
    cooperative = relationship("Cooperative", back_populates="user", uselist=False, cascade="all, delete-orphan")
    manufacturer = relationship("Manufacturer", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Cooperative(Base):
    __tablename__ = "cooperatives"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    location = Column(String(120))
    phone = Column(String(30))
    is_verified = Column(Boolean, default=False, nullable=False)
    verified_at = Column(DateTime)
    user = relationship("User", back_populates="cooperative")
    listings = relationship("MaterialListing", back_populates="cooperative", cascade="all, delete-orphan")
    requests = relationship("MaterialRequest", back_populates="cooperative")

    @property
    def name(self):
        return self.user.name

    @property
    def email(self):
        return self.user.email

    @property
    def registered_at(self):
        return self.user.created_at


class Manufacturer(Base):
    __tablename__ = "manufacturers"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    company_name = Column(String(120))
    industry = Column(String(120))
    location = Column(String(120))
    phone = Column(String(30))
    user = relationship("User", back_populates="manufacturer")
    requests = relationship("MaterialRequest", back_populates="manufacturer")

    @property
    def name(self):
        return self.company_name or self.user.name


class MaterialListing(Base):
    __tablename__ = "material_listings"
    id = Column(Integer, primary_key=True)
    cooperative_id = Column(Integer, ForeignKey("cooperatives.id"), nullable=False)
    name = Column(String(120), nullable=False, index=True)
    category = Column(String(60))
    quantity = Column(Float, nullable=False, default=0)
    price = Column(Float)
    location = Column(String(120))
    created_at = Column(DateTime, default=datetime.utcnow)
    cooperative = relationship("Cooperative", back_populates="listings")
    requests = relationship("MaterialRequest", back_populates="listing", cascade="all, delete-orphan")

    @property
    def availability(self) -> str:
        """Derived from quantity, never set by hand (business rule 5.6)."""
        if self.quantity <= 0:
            return "Out of stock"
        if self.quantity <= settings.LOW_STOCK_LIMIT:
            return "Low"
        return "Available"

    @property
    def cooperative_name(self):
        return self.cooperative.name

    @property
    def is_verified(self):
        return self.cooperative.is_verified


class MaterialRequest(Base):
    __tablename__ = "material_requests"
    id = Column(Integer, primary_key=True)
    manufacturer_id = Column(Integer, ForeignKey("manufacturers.id"), nullable=False)
    cooperative_id = Column(Integer, ForeignKey("cooperatives.id"), nullable=False)
    listing_id = Column(Integer, ForeignKey("material_listings.id"), nullable=False)
    quantity = Column(Float, nullable=False)
    message = Column(Text)
    status = Column(String(10), nullable=False, default="Pending")  # Pending | Accepted | Rejected
    created_at = Column(DateTime, default=datetime.utcnow)
    manufacturer = relationship("Manufacturer", back_populates="requests")
    cooperative = relationship("Cooperative", back_populates="requests")
    listing = relationship("MaterialListing", back_populates="requests")

    @property
    def listing_name(self):
        return self.listing.name

    @property
    def manufacturer_name(self):
        return self.manufacturer.name

    @property
    def cooperative_name(self):
        return self.cooperative.name


_EMAIL = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class RegisterIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: str
    password: str = Field(min_length=8, max_length=72)
    role: Literal["cooperative", "manufacturer"]
    organisation: Optional[str] = Field(default=None, max_length=120)  # company name for manufacturers
    location: Optional[str] = Field(default=None, max_length=120)
    phone: Optional[str] = Field(default=None, max_length=30)

    @field_validator("email")
    @classmethod
    def check_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not _EMAIL.match(v):
            raise ValueError("Enter a valid email address")
        return v


class LoginIn(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def lower_email(cls, v: str) -> str:
        return v.strip().lower()


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    name: str

class MeOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    is_verified: Optional[bool] = None


class ProfileIn(BaseModel):
    location: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=6, max_length=30)
    