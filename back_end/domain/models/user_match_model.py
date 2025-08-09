from sqlmodel import Field, SQLModel, JSON, Column

class Score(SQLModel):
    user_id: int
    points: int

class UserMatch(SQLModel, table = True):
    id : int = Field(default=None, nullable=False, primary_key=True)
    user_id: int = Field(default=None, foreign_key="user.id")
    match_id: int = Field(default=None, foreign_key="match.id")
    score: list[Score] | None = Field(sa_column=Column(JSON))

class UserMatchUpdate(SQLModel):
    scores: list[Score]