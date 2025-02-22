from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.diary import DiaryEntry
from app.db.utils import get_database
from app.db.crud.diary import (
    get_all_diary_entries,
    create_diary_entry,
    get_diary_entry_by_title,
    delete_diary_entry_by_title
)
from motor.motor_asyncio import AsyncIOMotorCollection

from services.emotions.personalityUpdate import update_personality


diary_router = APIRouter()

# Simulación de almacenamiento en memoria para las entradas del diario
diary_entries: List[DiaryEntry] = []

def analyze_text(text: str) -> str:
    """
    Función simulada para analizar el texto de una entrada del diario.
    """
    return "neutral"


def new_personality(text: str, big5_scores: dict, bfi_ranges: dict, alpha: float) -> str:
    """
    Función simulada para actualizar los puntajes de personalidad.
    """    
    return update_personality(text, big5_scores, bfi_ranges, alpha)

@diary_router.post(
    '/diary',
    response_model=DiaryEntry,
    status_code=status.HTTP_201_CREATED
)
async def create_entry(entry: DiaryEntry, db: AsyncIOMotorCollection = Depends(get_database)):
    """
    Recibe una entrada del diario, la analiza y la guarda.
    Se verifica que no exista ya una entrada con el mismo título.
    """
    try:
        # Simular análisis del contenido de la entrada
        emotion_result = analyze_text(entry.entrada)
        print(f"Análisis de la entrada '{entry.titulo}': {emotion_result}")

        # Crear la entrada en la base de datos
        created_entry = await create_diary_entry(db.diary, entry)
        return created_entry
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@diary_router.get(
    '/diary',
    response_model=List[DiaryEntry],
    status_code=status.HTTP_200_OK
)
async def get_all_entries(db: AsyncIOMotorCollection = Depends(get_database)):
    """
    Devuelve todas las entradas del diario.
    """
    entries = await get_all_diary_entries(db.diary)
    return entries

@diary_router.get(
    '/diary/{titulo}',
    response_model=DiaryEntry,
    status_code=status.HTTP_200_OK
)
async def get_entry_by_title(titulo: str, db: AsyncIOMotorCollection = Depends(get_database)):
    """
    Devuelve una única entrada del diario según el título desde MongoDB.
    """
    entry = await get_diary_entry_by_title(db.diary, titulo)
    if entry:
        return entry
    raise HTTPException(
        status_code=404,
        detail="Entrada del diario no encontrada."
    )

@diary_router.delete(
    '/diary/{titulo}',
    status_code=status.HTTP_200_OK
)
async def delete_entry_by_title(titulo: str, db: AsyncIOMotorCollection = Depends(get_database)):
    """
    Elimina una entrada del diario según el título desde MongoDB.
    """
    deleted = await delete_diary_entry_by_title(db.diary, titulo)
    if deleted:
        return {"detail": f"Entrada '{titulo}' eliminada correctamente."}
    raise HTTPException(
        status_code=404,
        detail="Entrada del diario no encontrada."
    )
