from motor.motor_asyncio import AsyncIOMotorCollection
from passlib.context import CryptContext
from app.models.user import Emotions, UserCreate, UserLogin
from typing import Optional, Dict, Any
from bson import ObjectId
from fastapi import HTTPException, status

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


async def login_user(collection: AsyncIOMotorCollection, user: UserLogin):
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


async def get_user_by_id(
    collection: AsyncIOMotorCollection, user_id: str
) -> Optional[UserCreate]:
    """
    Busca un usuario por su user_id.
    Devuelve el usuario si lo encuentra, de lo contrario devuelve None.
    """
    user = await collection.find_one({"user_id": user_id})
    if user:
        # Eliminar el campo password_hash por seguridad
        user.pop("password_hash", None)
    return user


async def update_user_emotions(
    collection: AsyncIOMotorCollection, user_id: str, new_emotions: Emotions
):
    """
    Actualiza el campo 'emotions' de un usuario en la base de datos.

    Parámetros:
        collection (AsyncIOMotorCollection): La colección de MongoDB.
        user_id (str): El ID del usuario a actualizar.
        new_emotions (Dict[str, Any]): El nuevo valor para el campo 'emotions'.

    Retorna:
        bool: True si la actualización fue exitosa, False si el usuario no fue encontrado.
    """
    try:
        # Convertir el user_id a ObjectId
        user_id_obj = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El user_id no es un ObjectId válido.",
        )

    try:
        # Buscar y actualizar el usuario por su user_id
        updated_user = await collection.find_one_and_update(
            {"_id": user_id_obj},  # Filtro para encontrar el usuario
            {
                "$set": {"emotions": new_emotions.model_dump()}
            },  # Nuevo valor para el campo emotions
            return_document=True,  # Devolver el documento actualizado
        )

        if not updated_user:
            raise ValueError("Usuario no encontrado")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar las emociones: {str(e)}",
        )
