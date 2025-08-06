from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from back_end.application.db import get_session
from ..domain.models.match_model import Match as MatchModel, MatchCreate, MatchUpdate

router = APIRouter(prefix="/match",tags=["match"])

@router.get("/health")
def health():
    return "Healthy"

@router.get("/matches", response_model=list[MatchModel])
def get_all_matches(session: Session = Depends(get_session)):
    result = session.execute(select(MatchModel))
    matches = result.scalars().all()
    return [MatchModel(players=match.players, result=match.result, score=match.score, id=match.id) for match in matches]

@router.post("/create", response_model=MatchModel)
def create_match(match: MatchCreate, session: Session = Depends(get_session)):
    match = MatchModel(result=match.result, score=match.score, players=match.players)
    session.add(match)
    session.commit()
    session.refresh(match)
    return match

@router.patch("/finish", response_model=MatchModel)
def update_match(match_id : int, match: MatchUpdate, session: Session = Depends(get_session)):
    match_db = session.get(MatchModel, match_id)
    if not match_db:
        raise HTTPException(status_code=404, detail="Match not found")
    match_data = match.model_dump(exclude_unset=True)
    match_db.sqlmodel_update(match_data)
    session.add(match_db)
    session.commit()
    session.refresh(match_db)
    return match_db
