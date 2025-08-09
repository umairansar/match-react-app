from sqlmodel import Field, SQLModel
from ..enums.department_enum import DepartmentEnum

class UserBase(SQLModel):
    name: str
    department: DepartmentEnum

class User(UserBase, table = True):
    id : int = Field(default=None, nullable=False, primary_key=True)

class UserCreate(UserBase):
    pass