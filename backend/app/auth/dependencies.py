from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorCollection
from app.db.utils import get_database
from app.auth.utils import verify_token
from app.models.user import UserResponse

# Configuración de OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorCollection = Depends(get_database),
) -> UserResponse:
    """
    Dependencia para obtener el usuario actual a partir del token JWT.
    Devuelve un modelo UserResponse en lugar de un diccionario.
    """
    # Verificar el token
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
        )

    # Extraer el email del payload del token
    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token no contiene información de usuario",
        )

    # Buscar el usuario en la base de datos
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado",
        )

    # Convertir el ObjectId a str y devolver el modelo UserResponse
    user["id"] = str(user["_id"])  # Convertir ObjectId a str
    return UserResponse(**user)
