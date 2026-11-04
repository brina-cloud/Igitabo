
from sqlchemy import create_engine
from sqlchemy.orm import declarative_base, sessionmaker

from backend.app.config import settings
_connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(settings.DATABASE_URL, connect_args=_connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yeild db
    finally:
        db.close()

