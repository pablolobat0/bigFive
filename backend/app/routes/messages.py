from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.message import ChatMessage, ChatResponse
import uuid

message_router = APIRouter()

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
    emotion = "neutral"  # Valor de ejemplo; aquí se integraría el análisis real

    # Almacenar el mensaje en la "base de datos" en memoria
    messages_db.append(message)

    # Devolver la respuesta con el resultado del análisis
    return ChatResponse(id=message.id, text=message.text, emotion=emotion)

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
