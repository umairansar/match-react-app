from sqlmodel import Field, SQLModel
from .user_model import User

class MatchBase(SQLModel):
    result:str
    players:str
    score:str

class Match(MatchBase, table = True):
    id : int = Field(default=None, nullable=False, primary_key=True)

