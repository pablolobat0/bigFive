import motor.motor_asyncio
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Configuración de MongoDB
MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

async def get_mongo_client():
    """
    Crea y devuelve una conexión a MongoDB usando Motor.
    """
    return motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)

async def get_database(client):
    """
    Devuelve la base de datos especificada desde el cliente de MongoDB.
    """
    return client[DATABASE_NAME]


async def close_client(client):
    """
    Cierra la conexion con la base de datos
    """
    client.close()
