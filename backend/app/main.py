from fastapi import FastAPI
from app.routers import auth

app = FastAPI(title="Paper Trading API")

@app.get("/health")
def health():
    return {"ok": True}

app.include_router(auth.router)
