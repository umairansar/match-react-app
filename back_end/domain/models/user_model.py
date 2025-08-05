from sqlmodel import Field, SQLModel

class UserBase(SQLModel):
    name:str
    department:str

class User(UserBase, table = True):
    id : int = Field(default=None, nullable=False, primary_key=True)

class UserCreate(UserBase):
    pass