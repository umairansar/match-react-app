from sqlmodel import Field, SQLModel

class MatchBase(SQLModel):
    result:str
    # update players to tuple of player
    players:str
    score:str

class Match(MatchBase, table = True):
    id : int = Field(default=None, nullable=False, primary_key=True)

class MatchCreate(MatchBase):
    pass

class MatchUpdate(MatchBase):
    pass