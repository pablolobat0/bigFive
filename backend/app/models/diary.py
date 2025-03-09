from pydantic import BaseModel


# Modelo para la entrada del diario
class DiaryEntry(BaseModel):
    user_id: str | None = None
    titulo: str
    entrada: str
