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
    user_id: str
    email: EmailStr
    password: str
    name: str
    emotions: Emotions | None = None



user_example = UserCreate(
    user_id="12345",
    email="user@example.com",
    password="securepassword123",
    name="John Doe",
    emotions=Emotions(
        neuroticism=12,
        extraversion=25,
        openness=30,
        agreeableness=20,
        conscientiousness=35
    )
)
