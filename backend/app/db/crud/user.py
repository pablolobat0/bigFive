# db/crud/user.py
from motor.motor_asyncio import AsyncIOMotorCollection
from passlib.context import CryptContext
from app.auth.utils import create_access_token
from app.models.user import UserCreate, UserLogin

# Configuración de hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_user(collection: AsyncIOMotorCollection, user: UserCreate):
    """
    Crea un usuario
    """
    # Verificar si ya existe una entrada con el mismo título
    existing_user = await collection.find_one({"email": user.email})
    if existing_user:
        raise ValueError("Ya existe un usuario con ese email.")

    # Hashear la contraseña
    hashed_password = pwd_context.hash(user.password)

    # Crear un diccionario con los datos del usuario
    user_dict = user.model_dump()
    user_dict["password_hash"] = hashed_password  # Reemplazar la contraseña con el hash
    del user_dict["password"]  # Eliminar la contraseña en texto plano
    
    # Insertar el usuario en la colección
    result = await collection.insert_one(user_dict)
    if not result.inserted_id:
        raise ValueError("No se pudo crear el usuario.")

async def login_user(collection: AsyncIOMotorCollection, user: UserLogin) -> dict:
    """
    Inicia la sesión del usuario si las credenciales son correctas
    """
    # Buscar el usuario por email
    db_user = await collection.find_one({"email": user.email})
    if not db_user:
        raise ValueError("Email o contraseña incorrectos")
    
    # Verificar la contraseña
    if not pwd_context.verify(user.password, db_user["password_hash"]):
        raise ValueError("Email o contraseña incorrectos")
    
    # Generar el token JWT
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
