from fastapi import APIRouter
from ..domain.models import match_model as Match

router = APIRouter(prefix="/match",tags=["match"])

@router.get("/health")
def health():
    return "Healthy"

@router.get("/matches", response_model=[Match])
def get_all_matches(session: Session = Depends(get_session)):
    result = session.execute(select(Match))
    matches = result.scalars().all()
    return [Match(players=match.players, result=match.result, score=match.score, id=match.id) for match in matches]

