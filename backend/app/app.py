from fastapi import APIRouter, FastAPI
from app.routes.messages import message_router
from app.routes.diary import diary_router
from contextlib import asynccontextmanager
from app.db.utils import get_mongo_client, get_database,close_client


from fastapi import FastAPI
from contextlib import asynccontextmanager
import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Maneja el ciclo de vida de la aplicación:
    - Conecta a MongoDB antes de iniciar.
    - Cierra la conexión al apagar la app.
    """
    print("Iniciando aplicación...")
    
    # Crear conexión a MongoDB
    app.state.mongodb_client = await get_mongo_client()
    app.state.database = await get_database(app.state.mongodb_client)
    print("✅ Conexión a MongoDB establecida.")

    yield  # Permite que la aplicación se ejecute

    # Cerrar conexión al terminar
    print("Apagando aplicación...")
    await close_client(app.state.mongodb_client) 
    print("✅ Conexión a MongoDB cerrada.")

# Crear aplicación con Lifespan
app = FastAPI(lifespan=lifespan)


router = APIRouter()

router.include_router(message_router)
router.include_router(diary_router)


app.include_router(router)


