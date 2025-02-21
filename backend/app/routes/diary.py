from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from datetime import datetime
from typing import List

diary_router = APIRouter()

# Modelo para la entrada del diario
class DiaryEntry(BaseModel):
    titulo: str
    entrada: str
    fecha: datetime

# Simulación de almacenamiento en memoria para las entradas del diario
diary_entries: List[DiaryEntry] = []

def analyze_text(text: str) -> str:
    """
    Función simulada para analizar el contenido de la entrada.
    En una implementación real se integraría un modelo de análisis (ej. Vader, text2emotion, etc.)
    """
    # Por ejemplo, se podría devolver "neutral", "positivo" o "negativo".
    return "neutral"

@diary_router.post(
    '/diary',
    response_model=DiaryEntry,
    status_code=status.HTTP_201_CREATED
)
async def create_diary_entry(entry: DiaryEntry):
    """
    Recibe una entrada del diario, la analiza y la guarda.
    Se verifica que no exista ya una entrada con el mismo título.
    """
    # Verificar si ya existe una entrada con el mismo título (se asume título único)
    for diary in diary_entries:
        if diary.titulo == entry.titulo:
            raise HTTPException(
                status_code=400, 
                detail="Ya existe una entrada con este título."
            )
    
    # Simular análisis del contenido de la entrada
    emotion_result = analyze_text(entry.entrada)
    # Se podría almacenar o utilizar el resultado del análisis según las necesidades.
    print(f"Análisis de la entrada '{entry.titulo}': {emotion_result}")
    
    diary_entries.append(entry)
    return entry

@diary_router.get(
    '/diary',
    response_model=List[DiaryEntry],
    status_code=status.HTTP_200_OK
)
async def get_all_diary_entries():
    """
    Devuelve todas las entradas del diario.
    """
    return diary_entries

@diary_router.get(
    '/diary/{titulo}',
    response_model=DiaryEntry,
    status_code=status.HTTP_200_OK
)
async def get_diary_entry(titulo: str):
    """
    Devuelve una única entrada del diario según el título.
    """
    for diary in diary_entries:
        if diary.titulo == titulo:
            return diary
    raise HTTPException(
        status_code=404,
        detail="Entrada del diario no encontrada."
    )

@diary_router.delete(
    '/diary/{titulo}',
    status_code=status.HTTP_200_OK
)
async def delete_diary_entry(titulo: str):
    """
    Permite borrar una entrada del diario según el título.
    """
    for idx, diary in enumerate(diary_entries):
        if diary.titulo == titulo:
            diary_entries.pop(idx)
            return {"detail": f"Entrada '{titulo}' eliminada correctamente."}
    raise HTTPException(
        status_code=404,
        detail="Entrada del diario no encontrada."
    )
