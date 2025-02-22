from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import  AsyncIOMotorCollection
from app.auth.utils import create_access_token
from app.db.crud.user import create_user, login_user
from app.db.utils import get_database
from app.models.user import UserCreate, UserLogin, Token

user_router = APIRouter()

@user_router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: AsyncIOMotorCollection = Depends(get_database)):
    try:
        await create_user(db.users, user)
        access_token = create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer"}
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@user_router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
async def login(user: UserLogin, db: AsyncIOMotorCollection = Depends(get_database)):
    try:
        return await login_user(db.users, user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
