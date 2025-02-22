from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.message import ChatMessage, ChatResponse
import uuid
from typing import Optional, List, Dict, Literal

from app.services.chatbot import ChatbotService

message_router = APIRouter()

chatbot_service = ChatbotService()

# Simulación de almacenamiento en memoria (para prototipo)
messages_db: List[ChatMessage] = []

@message_router.post(
    '/messages', 
    response_model=ChatResponse, 
    status_code=status.HTTP_201_CREATED
)
async def process_message(message: ChatMessage):
    """
    Recibe un mensaje del chatbot, lo procesa (por ejemplo, analizando el sentimiento) 
    y lo almacena antes de enviarlo al LLM para una respuesta final.
    """
    # Generar un ID único para el mensaje si no se ha proporcionado
    if not message.id:
        message.id = str(uuid.uuid4())

    # Simulación del análisis emocional (en un caso real, se invocaría al modelo)
    # Por ejemplo, utilizando Vader, GoEmotion o cualquier otro método.
    emotion = "neutral"

    # Almacenar el mensaje en la "base de datos" en memoria
    messages_db.append(message)

    conversation_history: List[Dict[Literal["role", "content"], str]] = [
        {"role": "user", "content": message.text}
    ]
    chatbot_response = chatbot_service.get_chat_response(conversation_history)

    # Verificar si la respuesta es None
    if chatbot_response is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="No se pudo generar una respuesta."
        )

    # Devolver la respuesta con el resultado del análisis
    return ChatResponse(id=message.id, text=chatbot_response, emotion=emotion)

@message_router.get(
    '/messages', 
    response_model=List[ChatMessage],
    status_code=status.HTTP_200_OK
)
async def get_all_messages():
    """
    Permite consultar todos los mensajes almacenados (útil para ver el historial).
    """
    return messages_db

@message_router.get(
    '/messages/{message_id}', 
    response_model=ChatMessage,
    status_code=status.HTTP_200_OK
)
async def get_message(message_id: str):
    """
    Permite consultar un mensaje específico por su ID.
    """
    for msg in messages_db:
        if msg.id == message_id:
            return msg
    raise HTTPException(status_code=404, detail="Mensaje no encontrado")
