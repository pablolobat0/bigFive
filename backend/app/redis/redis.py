import os
from dotenv import load_dotenv
import redis

# Cargar variables de entorno desde .env
load_dotenv()

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = os.getenv("REDIS_PORT", "6379")

# Configuración de Redis
redis_client = redis.Redis(
    host= REDIS_HOST,
    port=int(REDIS_PORT),
    db=0,
    decode_responses=True  # Para obtener strings en lugar de bytes
)
