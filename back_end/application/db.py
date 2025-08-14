import os
from dotenv import load_dotenv
from sqlmodel import Session, SQLModel, create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()
DATABASE_URL = os.environ.get("DATABASE_URL")
DATABASE_URL_ASYNC = "sqlite+aiosqlite:///database.db"

engine = create_engine(DATABASE_URL, echo=True)
async_engine = create_async_engine(DATABASE_URL_ASYNC, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

async def get_async_session():
    async with AsyncSession(async_engine) as session:
        yield session