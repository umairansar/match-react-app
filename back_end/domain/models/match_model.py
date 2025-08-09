from sqlmodel import Field, SQLModel

class MatchBase(SQLModel):
    winner: int | None
    loser: int  | None  

class Match(MatchBase, table = True):
    id: int = Field(default=None, nullable=False, primary_key=True)
    dateTime: str

class MatchCreate(SQLModel):
    players: list[int]

class MatchUpdate(MatchBase):
    pass