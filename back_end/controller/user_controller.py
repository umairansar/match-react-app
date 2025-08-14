from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from back_end.application.db import get_session
from ..domain.models.user_model import User as UserModel, UserCreate, UserUpdate

router = APIRouter(prefix="/user",tags=["user"])

@router.get("/health")
def health():
    return "Healthy"

@router.get("/user", response_model=UserModel)
def get_one_user(user_id: int, session: Session = Depends(get_session)):
    result = session.get(UserModel, user_id)
    if not result:
        raise HTTPException(status_code=404, detail=f"User not found, id : {user_id}")
    return result

@router.get("/users", response_model=list[UserModel])
def get_all_users(session: Session = Depends(get_session)):
    result = session.execute(select(UserModel))
    users = result.scalars().all()
    return [UserModel(name=user.name, department=user.department, rating=user.rating, id=user.id) for user in users]

@router.post("/create", response_model=UserModel)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    user = UserModel(name=user.name, department=user.department, rating=0)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.put("/update", response_model=UserModel)
def update_user(user_id : int, user: UserUpdate, session: Session = Depends(get_session)):
    user_db = session.get(UserModel, user_id)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user.model_dump(exclude_unset=True)
    user_db.sqlmodel_update(user_data)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db

def fetch_user(user_id: int, session: Session):
    return session.get(UserModel, user_id)