from sqlmodel import Field, SQLModel, Relationship
from ..enums.department_enum import DepartmentEnum
from .match_model import Match

class UserBase(SQLModel):
    name: str
    department: DepartmentEnum
    rating: int
    # team: int | None :::: to be used when creating teams

class User(UserBase, table = True):
    id : int = Field(default=None, nullable=False, primary_key=True)

class UserCreate(UserBase):
    pass

class UserUpdate(SQLModel):
    rating: int