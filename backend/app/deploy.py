import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend.app.config import settings
from backend.app.database import Base, SessionLocal, engine
from backend.app.models import schemas  # noqa: F401  (registers the tables)
from backend.app.routers import admin, auth, content, listings, match
from backend.app.routers import requests as requests_router
from backend.app.seeds import seed_admin, seed_demo_data


def create_app() -> FastAPI:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_admin(db)
        if settings.SEED_DEMO:
            seed_demo_data(db)

    app = FastAPI(title="Igitabo")
    app.include_router(auth.router)
    app.include_router(content.router)
    app.include_router(listings.router)
    app.include_router(match.router)
    app.include_router(requests_router.router)
    app.include_router(admin.router)

    frontend_dir = settings.PROJECT_DIR / "frontend"
    app.mount("/", StaticFiles(directory=str(frontend_dir), html=True), name="frontend")
    return app


app = create_app()


