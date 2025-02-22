from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.message import ChatMessage, ChatResponse
from typing import List, Dict, Literal
from app.services.chatbot import ChatbotService
from motor.motor_asyncio import AsyncIOMotorCollection
from app.db.utils import get_database
from app.db.crud.message import (
    create_message,
    get_all_messages,
    get_message_by_id
)
message_router = APIRouter()

chatbot_service = ChatbotService()

@message_router.post(
    '/messages', 
    response_model=ChatResponse, 
    status_code=status.HTTP_201_CREATED
)
async def process_message(message: ChatMessage, db: AsyncIOMotorCollection = Depends(get_database)):
    """
    Recibe un mensaje del chatbot, lo procesa (por ejemplo, analizando el sentimiento) 
    y lo almacena antes de enviarlo al LLM para una respuesta final.
    """
    try:
        # Crear el mensaje en la base de datos
        created_message = await create_message(db.messages, message)
        
        # Simulación del análisis emocional (en un caso real, se invocaría al modelo)
        emotion = "neutral"

        # Obtener la respuesta del chatbot
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
        return ChatResponse(id=created_message["id"], text=chatbot_response, emotion=emotion)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@message_router.get(
    '/messages', 
    response_model=List[ChatMessage],
    status_code=status.HTTP_200_OK
)
async def get_messages(db: AsyncIOMotorCollection = Depends(get_database)):
    """
    Permite consultar todos los mensajes almacenados en MongoDB.
    """
    messages = await get_all_messages(db.messages)
    return messages
@message_router.get(
    '/messages/{message_id}', 
    response_model=ChatMessage,
    status_code=status.HTTP_200_OK
)

async def get_message(message_id: str, db: AsyncIOMotorCollection = Depends(get_database)):
    """
    Permite consultar un mensaje específico por su ID desde MongoDB.
    """
    message = await get_message_by_id(db.messages, message_id)
    if message:
        return message
    raise HTTPException(status_code=404, detail="Mensaje no encontrado")
