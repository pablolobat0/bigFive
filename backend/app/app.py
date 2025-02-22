from fastapi import APIRouter, FastAPI
from app.routes.messages import message_router
from app.routes.diary import diary_router
from app.routes.user import user_router
from contextlib import asynccontextmanager
from app.db.utils import get_mongo_client, close_client
from fastapi.middleware.cors import CORSMiddleware


from fastapi import FastAPI
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Maneja el ciclo de vida de la aplicación:
    - Conecta a MongoDB antes de iniciar.
    - Cierra la conexión al apagar la app.
    """
    print("Iniciando aplicación...")
    # Crear conexión a MongoDB
    await get_mongo_client()
    print("✅ Conexión a MongoDB establecida.")

    yield  # Permite que la aplicación se ejecute

    # Cerrar conexión al terminar
    print("Apagando aplicación...")
    await close_client() 
    print("✅ Conexión a MongoDB cerrada.")

# Crear aplicación con Lifespan
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todas las cabeceras
)


router = APIRouter()

router.include_router(message_router)
router.include_router(diary_router)
router.include_router(user_router)


app.include_router(router)


