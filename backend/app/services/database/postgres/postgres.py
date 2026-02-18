import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.services.database.postgres import postgres

# Choose localhost or postgres
db_host = os.environ.get("DB_HOST") if os.path.exists("/.dockerenv") else "localhost"
db_user = os.environ.get("DB_USER")
db_password = os.environ.get("DB_PASSWORD")
db_name = os.environ.get("DB_NAME")
db_port = os.environ.get("DB_PORT", "5432")

# Create the database URL
db_url = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

# Create the SQLAlchemy engine and session
engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Dependency to get DB session
def get_postgres():
    db = postgres.SessionLocal()
    try:
        yield db
    finally:
        db.close()
