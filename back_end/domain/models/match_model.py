from sqlmodel import Field, SQLModel, Relationship
from .user_match_model import UserMatch
# from .user_model import User

class MatchBase(SQLModel):
    winner: int | None
    loser: int  | None  

class Match(MatchBase, table = True):
    id: int = Field(default=None, nullable=False, primary_key=True)
    dateTime: str
    match_links : list[UserMatch] = Relationship(back_populates="match")

class MatchCreate(SQLModel):
    players: list[int]

class MatchUpdate(MatchBase):
    pass