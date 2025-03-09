from pydantic import BaseModel
from typing import Literal


class ChatMessage(BaseModel):
    """
    Modelo de datos para un mensaje de chat.
    """

    text: str
    author: Literal["user", "assistant"]
