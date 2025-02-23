from pydantic import BaseModel

 # Modelo para la entrada del diario
class DiaryEntry(BaseModel):
    user_id: str
    titulo: str
    entrada: str


