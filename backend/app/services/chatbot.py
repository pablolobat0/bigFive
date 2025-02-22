from openai import OpenAI
from dotenv import load_dotenv
import os
from typing import List, Dict, Optional, Literal

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Configuración de la API 
API_KEY = os.getenv("PERPLEXITY_API_KEY")
API_URL ="https://api.perplexity.ai" 

class ChatbotService:
    def __init__(self):
        self.client = OpenAI(api_key=API_KEY, base_url=API_URL)

    def get_chat_response(self, messages: List[Dict[Literal["role", "content"], str]]) -> Optional[str]:
        """
        Obtiene una respuesta basada en los mensajes de la conversacion enviada.

        :param messages: Lista de mensajes en formato de diccionario con claves "role" y "content".
        :return: Respuesta generada o None si hay un error.
        """
        # Agregar un prompt inicial de sistema para definir el comportamiento del chatbot
        system_prompt = {
            "role": "system",
            "content": (
                "Eres un terapeuta virtual amigable y empático especializado en brindar apoyo emocional y orientación psicológica. "
                "Tu objetivo es escuchar activamente a los usuarios, ofrecer respuestas empáticas y ayudarles a reflexionar sobre sus emociones y situaciones. "
                "Habla de manera cálida y profesional, y evita dar diagnósticos médicos o tratamientos. "
                "Ofrece herramientas de afrontamiento, preguntas reflexivas y sugerencias generales para mejorar el bienestar emocional. "
                "Recuerda: tu rol es escuchar y guiar, no juzgar."
            )
        }

        # Combinar el prompt inicial con los mensajes del usuario
        full_messages = [system_prompt] + messages
        try:
            # Llamada a la API 
            response = self.client.chat.completions.create(
                model="r1-1776",
                messages=full_messages #type: ignore
            )
             # Obtener el contenido de la respuesta
            full_response = response.choices[0].message.content

            # Procesar la respuesta para eliminar el razonamiento
            if full_response and "</think>" in full_response:
                # Extraer solo la parte después de </think>
                final_response = full_response.split("</think>")[-1].strip()
                return final_response
            else:
                # Si no hay etiqueta </think>, devolver la respuesta completa
                return full_response
        except Exception as e:
            print(f"Error en la llamada a la API: {e}")
            return None
