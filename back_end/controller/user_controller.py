from fastapi import APIRouter

router = APIRouter(prefix="/user",tags=["user"])

@router.get("/health")
def health():
    return "Healthy"
