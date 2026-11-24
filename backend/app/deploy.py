import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend.app.config import settings
from backend.app.database import Base, SessionLocal, engine
from backend.app.models import schemas  # noqa: F401  (registers the tables)
from backend.app.routers import admin, auth, content, listings, match
from backend.app.routers import requests as requests_router
from backend.app.seeds import seed_admin, seed_demo_data
from sqlalchemy.exc import IntegrityError


def create_app() -> FastAPI:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        try:
            seed_admin(db)
            if settings.SEED_DEMO:
                seed_demo_data(db)
        except IntegrityError:
            db.rollback()
            

    app = FastAPI(title="Igitabo API", version="1.0")
    for module in (auth, listings, match, admin, content):
        app.include_router(module.router)
    app.include_router(requests_router.router)

    @app.get("/api/health", tags=["system"])
    def health():
        return {"status": "ok"}

    if settings.FRONTEND_DIR.exists():
        app.mount("/", StaticFiles(directory=settings.FRONTEND_DIR, html=True), name="frontend")
    return app


app = create_app()