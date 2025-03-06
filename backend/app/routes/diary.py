from fastapi import APIRouter, HTTPException, status, Depends
from app.auth.dependencies import get_current_user
from app.db.crud.user import update_user_emotions
from app.models.diary import DiaryEntry
from app.db.utils import get_database
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List
import numpy as np

from app.models.user import Emotions, UserResponse
from app.services.bigfive import BigFiveAnalyzer
from app.services.chatbot import ChatbotService
from app.weaviate.utils import add_diary_entry, get_user_entries


diary_router = APIRouter()

chatbot_service = ChatbotService()
analyzer = BigFiveAnalyzer()


@diary_router.post("/diary", status_code=status.HTTP_201_CREATED)
async def create_entry(
    entry: DiaryEntry,
    db: AsyncIOMotorCollection = Depends(get_database),
    user: UserResponse = Depends(get_current_user),
):
    """
    Recibe una entrada del diario, la analiza y la guarda.
    """
    try:
        # Asignar el user_id del usuario autenticado
        entry.user_id = user.id

        # Crear la entrada en la base de datos
        add_diary_entry(user.id, entry.titulo, entry.entrada)

        embeddings = get_user_entries(user.id)

        if not embeddings:
            raise ValueError("No se encontraron embeddings válidos para el usuario.")

        avg_embedding = np.mean(embeddings, axis=0)

        scores = analyzer.analyze_from_embedding(avg_embedding)

        emotions = Emotions(**scores)

        await update_user_emotions(db.users, str(entry.user_id), emotions)
        return entry
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@diary_router.get(
    "/diary", response_model=List[DiaryEntry], status_code=status.HTTP_200_OK
)
async def get_all_entries(
    user: UserResponse = Depends(get_current_user),
):
    """
    Devuelve todas las entradas del diario.
    """
    entries = get_user_entries(user.id)
    return entries
