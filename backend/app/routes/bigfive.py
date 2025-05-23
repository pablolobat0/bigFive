from fastapi import APIRouter, HTTPException, status, Depends
from app.auth.dependencies import get_current_user
from typing import List, Dict, Literal

from app.models.user import Emotions, UserResponse
from app.services.chatbot import ChatbotService
from app.weaviate.utils import get_user_entries_text, get_user_entries_vectors


bigfive_router = APIRouter()

chatbot_service = ChatbotService()


@bigfive_router.get("/bigfive", response_model=Emotions, status_code=status.HTTP_200_OK)
async def get_bigfive(
    user: UserResponse = Depends(get_current_user),
) -> Emotions:
    """
    Devuelve la calificación en la escala BigFive de la personalidad del usuario
    """
    try:
        if not user.emotions:
            raise ValueError("El usuario no tiene un análisis de sus emociones")

        return user.emotions
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@bigfive_router.get(
    "/coach", response_model=Dict[str, str], status_code=status.HTTP_200_OK
)
async def get_advices(
    user: UserResponse = Depends(get_current_user),
) -> Dict[str, str]:
    """
    Devuelve la calificación en la escala BigFive de la personalidad del usuario
    """
    try:
        all_entries = get_user_entries_text(user.id)

        # Concatenar el contenido de todas las entradas del diario
        all_entries_text = " ".join(
            f"{entry.titulo} {entry.entrada}" for entry in all_entries
        )

        all_text = (
            f"Basado en el siguiente análisis de emociones y entradas del diario, proporciona consejos personalizados:\n\n"
            f"Análisis de emociones:\n{user.emotions}\n\n"
            f"Entradas del diario:\n{all_entries_text}\n\n"
            f"Consejos:"
        )

        prompt: List[Dict[Literal["role", "content"], str]] = [
            {"role": "user", "content": all_text}
        ]

        advice = chatbot_service.get_emotional_advice(prompt)

        if not advice:
            raise ValueError("Error en el LLM")

        return {"advice": advice}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
