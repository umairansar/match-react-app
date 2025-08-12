from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
import datetime
from back_end.application.db import get_session
from ..domain.models.match_model import Match as MatchModel, MatchCreate, MatchBase, MatchUpdate
from ..domain.models.user_match_model import UserMatch, UserMatchUpdate
from .user_controller import fetch_user

router = APIRouter(prefix="/match",tags=["match"])

@router.get("/health")
def health():
    return "Healthy"

@router.get("/match", response_model=MatchModel)
def get_one_match(match_id: int, session: Session = Depends(get_session)):
    result = session.get(MatchModel, match_id)
    if not result:
        raise HTTPException(status_code=404, detail="Match not found")
    return result

@router.get("/matches", response_model=list[MatchModel])
def get_all_matches(session: Session = Depends(get_session)):
    result = session.execute(select(MatchModel))
    matches = result.scalars().all()
    return [MatchModel(winner=match.winner, loser=match.loser, dateTime=match.dateTime, id=match.id) for match in matches]

@router.post("/create", response_model=MatchModel)
def create_match(players: MatchCreate, session: Session = Depends(get_session)):
    missing_players = []
    for player in players.players:
        if not fetch_user(player, session):
            missing_players.append(player)
    
    if missing_players: 
        raise HTTPException(status_code=404, detail=f"Users not found : {missing_players}")

    match_create = MatchModel(winner=None, loser=None, dateTime=datetime.datetime.now())
    session.add(match_create)
    session.commit()

    for player in players.players:
        userMatch = UserMatch(user_id = player, match_id = match_create.id, score=None) 
        session.add(userMatch)
    session.commit()
    session.refresh(match_create)

    return match_create

@router.patch("/finish", response_model=MatchBase)
def update_match(match_id : int, scores: UserMatchUpdate, session: Session = Depends(get_session)):
    match_db = session.get(MatchModel, match_id)
    if not match_db:
        raise HTTPException(status_code=404, detail="Match not found")

    # if not validate_scores(scores):
    #     raise HTTPException(status_code=400, detail="Bad Request")
    
    user_points_dict = {s.points:s.user_id for s in scores.scores} 
    # {11:1} -> points:user_id
    points_list = sorted(user_points_dict.items(), key= lambda x:x[0], reverse = True)
    # sequence of tuples [(11,1),(8,2)]
    
    winner = points_list[0][1]
    loser = points_list[1][1]
    
    for points, user_id in points_list:
        statement = select(UserMatch).where(
            UserMatch.user_id == user_id,
            UserMatch.match_id == match_id
        )
        user_match = session.exec(statement).first()
        if user_match :
            user_match.score = points
        else : 
            session.add(UserMatch(user_id = user_id, match_id = match_id, score = points))

    match_db.winner = winner
    match_db.loser = loser
    session.add(match_db)
    session.commit()
    session.refresh(match_db)

    return match_db
