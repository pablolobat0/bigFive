from fastapi import APIRouter, Depends, HTTPException, status
from app.auth.dependencies import get_current_user
from app.models.message import ChatMessage
from app.models.user import UserResponse
from app.services.chatbot import ChatbotService
from app.weaviate.utils import add_chat_message, get_chat_history

message_router = APIRouter()

chatbot_service = ChatbotService()


@message_router.post(
    "/messages", response_model=ChatMessage, status_code=status.HTTP_201_CREATED
)
async def process_message(
    message: ChatMessage, user: UserResponse = Depends(get_current_user)
):
    """
    Recibe un mensaje del chatbot, lo procesa, lo almacena en Weaviate y devuelve la respuesta.
    """
    try:
        add_chat_message(user.id, message.text, message.author)
        conversation_history = get_chat_history(user.id)

        chatbot_response = chatbot_service.get_chat_response(conversation_history)

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
