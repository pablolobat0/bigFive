from pydantic import BaseModel
from datetime import datetime

 # Modelo para la entrada del diario
class DiaryEntry(BaseModel):
    user_id: str
    titulo: str
    entrada: str


