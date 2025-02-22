from typing import List, Dict, Literal
from .redis import redis_client

def get_user_conversation(user_id: str) -> List[Dict[Literal["role", "content"], str]]:
    """
    Recupera toda la conversación de un usuario desde Redis.
    """
    redis_key = f"chat:{user_id}"
    # Obtener todos los mensajes de la lista
    messages = redis_client.lrange(redis_key, 0, -1)  

    if not isinstance(messages, list):
        return []


    # Estructurar los mensajes en el formato adecuado
    conversation_history = []
    for i, message in enumerate(messages):
        # Alternar entre "user" y "assistant" para cada mensaje
        role = "user" if i % 2 == 0 else "assistant"
        conversation_history.append({"role": role, "content": message})

    return conversation_history
