from fastapi import FastAPI
from ..controller.main import api_router

app = FastAPI()
app.include_router(api_router)

@app.get("/health")
def health():
    return "Healthy"

