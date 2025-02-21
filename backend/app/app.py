from fastapi import APIRouter, FastAPI
from app.routes.messages import message_router
from app.routes.diary import diary_router

app = FastAPI()

router = APIRouter()

router.include_router(message_router)
router.include_router(diary_router)


app.include_router(router)
