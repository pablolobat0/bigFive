from pydantic import BaseModel
from typing import Optional
from datetime import datetime

 # Modelo para la entrada del diario
class DiaryEntry(BaseModel):
    user_id: str
    titulo: str
    entrada: str
    fecha: datetime


