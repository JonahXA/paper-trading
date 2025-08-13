from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt

from app.db.database import SessionLocal
from app.db.models import User
from app.schemas import RegisterIn, LoginIn, TokenOut
from app.auth_utils import create_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=TokenOut)
def register(payload: RegisterIn):
    db: Session = SessionLocal()
    try:
        if db.query(User).filter_by(email=payload.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        user = User(email=payload.email, hashed_password=bcrypt.hash(payload.password))
        db.add(user); db.commit(); db.refresh(user)
        return {"access_token": create_token(user.id)}
    finally:
        db.close()

@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn):
    db: Session = SessionLocal()
    try:
        user = db.query(User).filter_by(email=payload.email).first()
        if not user or not bcrypt.verify(payload.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return {"access_token": create_token(user.id)}
    finally:
        db.close()
