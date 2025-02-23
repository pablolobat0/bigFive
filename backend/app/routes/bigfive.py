from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.db.crud.user import get_user_by_id 
from app.db.utils import get_database
from app.db.crud.diary import (
    get_all_diary_entries_by_user_id,
)
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List, Dict, Literal

from app.models.user import Emotions
from app.services.chatbot import ChatbotService


bigfive_router = APIRouter()

chatbot_service = ChatbotService()

@bigfive_router.get(
    '/bigfive',
    response_model=Emotions,
    status_code=status.HTTP_200_OK
)
async def get_bigfive(user_id: str, db: AsyncIOMotorCollection = Depends(get_database)) -> Emotions:
    """
    Devuelve la calificación en la escala BigFive de la personalidad del usuario
    """
    try:
        user = await get_user_by_id(db.users, user_id)

        if not user:
            raise ValueError("El usuario no existe")

        if not user.emotions:
            raise ValueError("El usuario no tiene un análisis de sus emociones")


        return user.emotions
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@bigfive_router.get(
    '/coach',
    response_model=Dict[str, str],
    status_code=status.HTTP_200_OK
)
async def get_advices(user_id: str, db: AsyncIOMotorCollection = Depends(get_database)) -> Dict[str, str]:
    """
    Devuelve la calificación en la escala BigFive de la personalidad del usuario
    """
    try:
        user = await get_user_by_id(db.users, user_id)

        if not user:
            raise ValueError("El usuario no existe")
        if not user.emotions:
            raise ValueError("El usuario no tiene un análisis de sus emociones")

        
        all_entries = await get_all_diary_entries_by_user_id(db.entries, user_id)

        if not all_entries:
            raise ValueError("El usuario no tiene entradas en el diario")

        # Concatenar el contenido de todas las entradas del diario
        all_entries_text = " ".join([entry["entrada"] for entry in all_entries])

        all_text = (
            f"Basado en el siguiente análisis de emociones y entradas del diario, proporciona consejos personalizados:\n\n"
            f"Análisis de emociones:\n{user.emotions}\n\n"
            f"Entradas del diario:\n{all_entries_text}\n\n"
            f"Consejos:"
        )


        prompt: List[Dict[Literal["role", "content"], str]] = [
            {"role": "user", "content": all_text}] 

        advice = chatbot_service.get_emotional_advice(prompt)

        if not advice:
            raise ValueError("Error en el LLM")

        return {"advice": advice}
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

