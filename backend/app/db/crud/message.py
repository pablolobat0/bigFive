# db/crud/message.py
from motor.motor_asyncio import AsyncIOMotorCollection
from app.models.message import ChatMessage
from typing import List, Optional
import uuid

async def create_message(collection: AsyncIOMotorCollection, message: ChatMessage) -> dict:
    """
    Crea un nuevo mensaje en la colección de MongoDB.
    """
    # Generar un ID único si no se ha proporcionado
    if not message.id:
        message.id = str(uuid.uuid4())
    
    # Convertir el modelo Pydantic a un diccionario
    message_dict = message.model_dump()
    # Insertar el mensaje en la colección
    result = await collection.insert_one(message_dict)
    # Devolver el mensaje creado con el ID generado
    if result.inserted_id:
        message_dict["_id"] = result.inserted_id
        return message_dict
    raise ValueError("No se pudo crear el mensaje.")

async def get_all_messages(collection: AsyncIOMotorCollection) -> List[dict]:
    """
    Obtiene todos los mensajes de la colección.
    """
    messages = await collection.find().to_list(length=100)  # Limitar a 100 mensajes
    return messages

async def get_message_by_id(collection: AsyncIOMotorCollection, message_id: str) -> Optional[dict]:
    """
    Obtiene un mensaje por su ID.
    """
    message = await collection.find_one({"id": message_id})
    return message
