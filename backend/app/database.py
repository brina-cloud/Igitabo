
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from backend.app.config import settings

is_sqlite = settings.DATABASE_URL.startswith("sqlite")
connect_args = {"check_same_thread": False} if is_sqlite else {}
engine_options = {
    "connect_args": connect_args,
    "pool_pre_ping": True,
}
if not is_sqlite:
    engine_options.update({
        "pool_size": 5,
        "max_overflow": 10,
        "pool_recycle": 300,
    })

engine = create_engine(settings.DATABASE_URL, **engine_options)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

