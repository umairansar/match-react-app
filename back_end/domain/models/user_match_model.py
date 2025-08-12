from sqlmodel import Field, SQLModel, JSON, Column, Relationship

class Score(SQLModel):
    user_id: int
    points: int

class UserMatch(SQLModel, table = True):
    user_id: int = Field(default=None, foreign_key="user.id", primary_key=True)
    match_id: int = Field(default=None, foreign_key="match.id", primary_key=True)
    score: int | None
    user: "User" = Relationship(back_populates="user_links")
    match: "Match" = Relationship(back_populates="match_links")

class UserMatchUpdate(SQLModel):
    scores: list[Score]