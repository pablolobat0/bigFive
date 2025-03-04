from pydantic import BaseModel


# Modelos de datos
class ChatMessage(BaseModel):
    text: str
