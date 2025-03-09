from motor.motor_asyncio import AsyncIOMotorCollection
from fastapi import APIRouter, Depends, HTTPException, status
from app.auth.dependencies import get_current_user
from app.db.crud.user import update_user_emotions
from app.db.utils import get_database
from app.models.message import ChatMessage
from app.models.user import UserResponse
from app.routes.utils import analyze_user_personality
from app.services.chatbot import ChatbotService
from app.weaviate.utils import (
    add_chat_message,
    get_chat_history,
    get_user_entries_by_query,
)

message_router = APIRouter()

chatbot_service = ChatbotService()


@message_router.post(
    "/messages", response_model=ChatMessage, status_code=status.HTTP_201_CREATED
)
async def process_message(
    message: ChatMessage,
    user: UserResponse = Depends(get_current_user),
    db: AsyncIOMotorCollection = Depends(get_database),
):
    """
    Recibe un mensaje del chatbot, lo procesa, lo almacena en Weaviate y devuelve la respuesta.
    """
    try:
        # Se añade el mensaje a la base de datos
        add_chat_message(user.id, message.text, message.author)
        # Se recupera toda la conversacion del usuario
        conversation_history = get_chat_history(user.id)

        diary_entries = get_user_entries_by_query(user.id, message.text)

        emotions = analyze_user_personality(user.id)

        await update_user_emotions(db.users, user.id, emotions)

        chatbot_response = chatbot_service.get_chat_response(
            user.name, conversation_history, emotions, diary_entries
        )

        # Verificar si la respuesta es None
        if chatbot_response is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="No se pudo generar una respuesta.",
            )

        # Almacenar la respuesta del asistente en Weaviate
        add_chat_message(user.id, chatbot_response, "assistant")

        # Devolver la respuesta del asistente
        return ChatMessage(text=chatbot_response, author="assistant")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
