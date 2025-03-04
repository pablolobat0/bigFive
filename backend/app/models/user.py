from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class Emotions(BaseModel):
    neuroticism: float
    extraversion: float
    openness: float
    agreeableness: float
    conscientiousness: float


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str


class UserResponse(BaseModel):
    """
    Modelo para devolver los datos del usuario sin información sensible.
    """

    id: str  # El _id de MongoDB convertido a str
    email: EmailStr
    name: str
    emotions: Optional[Emotions] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
