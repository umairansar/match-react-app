from fastapi import APIRouter

from back_end.controller import match_controller
from . import user_controller

api_router = APIRouter()
api_router.include_router(user_controller.router)
api_router.include_router(match_controller.router)