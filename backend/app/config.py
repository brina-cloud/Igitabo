import os
from pathlib import Path

def _database_url() -> str:
    url = os.environ.get("DATABASE_URL", "sqlite:///./igitabo.db")
    if url.startswith("postgress://", but SQLAlchemy needs "postgresql://".
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    return url

