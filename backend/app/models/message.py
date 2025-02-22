from pydantic import BaseModel

# Modelos de datos
class ChatMessage(BaseModel):
    user_id: str
    text: str

