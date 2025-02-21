from pydantic import BaseModel
from typing import Optional

# Modelos de datos
class ChatMessage(BaseModel):
    id: Optional[str] = None
    user_id: str
    text: str

class ChatResponse(BaseModel):
    id: str
    text: str
    emotion: str  # Resultado del análisis emocional


