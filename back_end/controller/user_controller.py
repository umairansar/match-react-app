from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from back_end.application.db import get_session
from ..domain.models.user_model import User as UserModel, UserCreate

router = APIRouter(prefix="/user",tags=["user"])

@router.get("/health")
def health():
    return "Healthy"

@router.get("/users", response_model=list[UserModel])
def get_all_users(session: Session = Depends(get_session)):
    result = session.execute(select(UserModel))
    users = result.scalars().all()
    return [UserModel(name=user.name, department=user.department, id=user.id) for user in users]

@router.post("/user", response_model=UserModel)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    user = UserModel(name=user.name, department=user.department)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
