import motor.motor_asyncio
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Configuración de MongoDB
MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "default")

client = None
db = None

async def get_mongo_client():
    """
    Crea y devuelve una conexión a MongoDB usando Motor.
    """
    global client, db
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
    db = client[DATABASE_NAME]

async def get_database():
    """
    Devuelve la base de datos especificada desde el cliente de MongoDB.
    """
    return db


async def close_client():
    """
    Cierra la conexion con la base de datos
    """
    if(client!=None):
        client.close()
