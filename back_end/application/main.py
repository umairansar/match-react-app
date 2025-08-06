from fastapi import FastAPI
from back_end.application.db import init_db
from ..domain.models.user_model import User
from ..domain.models.match_model import Match
from ..controller.main import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)

@app.get("/health")
def health():
    return {"Healthy"}

@app.on_event("startup")
def on_startup():
    init_db()


