from datetime import datetime, timedelta
from jose import jwt
import os

SECRET = os.getenv("JWT_SECRET", "change_me")
ALG = os.getenv("JWT_ALG", "HS256")

def create_token(user_id: int, minutes: int = 60*24):
    payload = {"sub": str(user_id), "exp": datetime.utcnow() + timedelta(minutes=minutes)}
    return jwt.encode(payload, SECRET, algorithm=ALG)
