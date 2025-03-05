from fastapi import APIRouter, HTTPException, status, Depends
from app.auth.dependencies import get_current_user
from app.db.crud.user import update_user_emotions
from app.models.diary import DiaryEntry
from app.db.utils import get_database
from motor.motor_asyncio import AsyncIOMotorCollection
from typing import List, Dict, Literal
import json
import re

from app.models.user import UserResponse
from app.services.chatbot import ChatbotService
from app.weaviate.utils import add_diary_entry, get_user_entries


diary_router = APIRouter()

chatbot_service = ChatbotService()


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

        all_entries = get_user_entries(user.id)

        all_text = " ".join(
            f"{entry['title']} {entry['content']}" for entry in all_entries
        )

        all_messages: List[Dict[Literal["role", "content"], str]] = [
            {"role": "user", "content": all_text}
        ]

        response = chatbot_service.get_personality_scores(all_messages)
        if not response:
            raise ValueError(
                "Error en la respuesta del LLM: Respuesta vacía o inválida"
            )
        # Si la respuesta es un diccionario, úsalo directamente
        if isinstance(response, dict):
            personality_scores = response
        # Si la respuesta es un string JSON, conviértelo a diccionario
        elif isinstance(response, str):
            # Expresión regular para extraer el JSON
            json_pattern = re.compile(
                r'\{.*?"openness":\s*\d+(\.\d+)?.*?"conscientiousness":\s*\d+(\.\d+)?.*?"extraversion":\s*\d+(\.\d+)?.*?"agreeableness":\s*\d+(\.\d+)?.*?"neuroticism":\s*\d+(\.\d+)?.*?\}'
            )

            # Buscar el JSON en la respuesta del LLM
            match = json_pattern.search(response)
            if not match:
                raise ValueError(
                    "No se encontró un JSON válido en la respuesta del LLM"
                )

            # Extraer el JSON
            json_content = match.group(0)

            # Parsear el JSON
            personality_scores = json.loads(json_content)

        else:
            raise ValueError("Tipo de respuesta no válido del LLM")

        await update_user_emotions(db.users, str(entry.user_id), personality_scores)
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
