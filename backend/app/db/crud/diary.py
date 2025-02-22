# db/crud/diary.py
from motor.motor_asyncio import AsyncIOMotorCollection
from app.models.diary import DiaryEntry
from typing import List, Optional

async def create_diary_entry(collection: AsyncIOMotorCollection, entry: DiaryEntry) -> dict:
    """
    Crea una nueva entrada en el diario.
    """
    # Verificar si ya existe una entrada con el mismo título
    existing_entry = await collection.find_one({"titulo": entry.titulo})
    if existing_entry:
        raise ValueError("Ya existe una entrada con este título.")
    
    # Convertir el modelo Pydantic a un diccionario
    entry_dict = entry.model_dump()
    # Insertar la entrada en la colección
    result = await collection.insert_one(entry_dict)
    # Devolver la entrada creada con el ID generado
    if result.inserted_id:
        entry_dict["_id"] = result.inserted_id
        return entry_dict
    raise ValueError("No se pudo crear la entrada.")

async def get_all_diary_entries(collection: AsyncIOMotorCollection) -> List[dict]:
    """
    Obtiene todas las entradas del diario.
    """
    entries = await collection.find().to_list(length=100)  # Limitar a 100 entradas
    return entries

async def get_diary_entry_by_title(collection: AsyncIOMotorCollection, titulo: str) -> Optional[dict]:
    """
    Obtiene una entrada del diario por su título.
    """
    entry = await collection.find_one({"titulo": titulo})
    return entry

async def delete_diary_entry_by_title(collection: AsyncIOMotorCollection, titulo: str) -> bool:
    """
    Elimina una entrada del diario por su título.
    """
    result = await collection.delete_one({"titulo": titulo})
    return result.deleted_count > 0
