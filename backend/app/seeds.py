from backend.app.config import settings
from backend.app.models.schemas import User
from backend.app.services.auth import hash_password


def seed_admin(db) -> None:
    if db.query(User).filter(User.email == settings.ADMIN_EMAIL).first():
        return
    db.add(User(
        name="Administrator",
        email=settings.ADMIN_EMAIL,
        password_hash=hash_password(settings.ADMIN_PASSWORD),
        role="administrator",
    ))
    db.commit()


def seed_demo_data(db) -> None:
    # Demo seeding is optional and intentionally kept separate from deployment startup.
    return None