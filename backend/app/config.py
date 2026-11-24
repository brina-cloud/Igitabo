import os
from pathlib import Path

def _database_url() -> str:
    url = os.environ.get("DATABASE_URL", "sqlite:///./igitabo.db")
    if url.startswith("postgress://"):
        url = url.replace("postgress://", "postgresql://", 1)
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    if url.startswith("postgresql://") and "+psycopg" not in url:
        url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
    return url


class Settings:
    DATABASE_URL = _database_url()
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-only-secret-change-me-before-deploying")
    TOKEN_HOURS = int(os.environ.get("TOKEN_HOURS", "8"))
    LOW_STOCK_LIMIT = float(os.environ.get("LOW_STOCK_LIMIT", "100"))
    ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@igitabo.local")
    ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Changeme")
    SEED_DEMO = os.environ.get("SEED_DEMO", "0") == "1"
    PROJECT_DIR = Path(__file__).resolve().parents[2]
    FRONTEND_DIR = PROJECT_DIR
settings = Settings()
if os.environ.get("VERCEL") and settings.SECRET_KEY.startswith("dev-only"):
    raise RuntimeError("Set SECRET_KEY in the environment before deploying.")