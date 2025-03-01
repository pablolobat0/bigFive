from openai import OpenAI
from dotenv import load_dotenv
import os
import json
from typing import List, Dict, Optional, Literal

from app.services.emotions.personalityUpdate import max_emotion

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Configuración de la API 
API_KEY = os.getenv("PERPLEXITY_API_KEY")
API_URL ="https://api.perplexity.ai" 

def get_emotional_context(emotion: str) -> str:
    """
    Devuelve un texto de contexto según la emoción dominante.
    """
    emotion = emotion.lower()
    if emotion == "admiration":
        return "El usuario siente admiración, lo cual puede reflejar aprecio o inspiración. Responde reconociendo su admiración y alentándolo a seguir valorando aquello que le inspira."
    elif emotion == "amusement":
        return "El usuario se siente divertido y animado, lo que indica que está disfrutando el momento. Responde con un tono ligero y alegre."
    elif emotion == "anger":
        return "El usuario muestra enojo, por lo que es importante responder de forma calmada y empática."
    elif emotion == "annoyance":
        return "El usuario se siente molesto o irritado. Responde reconociendo su frustración y ofreciendo comprensión y posibles soluciones."
    elif emotion == "approval":
        return "El usuario aprueba o valida una idea, lo cual indica un sentimiento positivo. Refuerza su punto de vista de forma alentadora."
    elif emotion == "caring":
        return "El usuario demuestra cuidado y empatía. Responde de manera cálida y comprensiva, reconociendo su actitud."
    elif emotion == "confusion":
        return "El usuario se siente confundido. Ayuda a clarificar la información y ofrécele una guía clara para comprender mejor la situación."
    elif emotion == "curiosity":
        return "El usuario muestra curiosidad y deseo de aprender. Proporciona información estimulante y responde de forma que despierte su interés."
    elif emotion == "desire":
        return "El usuario expresa un fuerte deseo o anhelo. Responde alentándolo a perseguir sus metas y validando sus aspiraciones."
    elif emotion == "disappointment":
        return "El usuario se siente decepcionado. Responde con empatía, ofreciendo consuelo y, si es posible, alternativas o esperanzas renovadas."
    elif emotion == "disapproval":
        return "El usuario muestra desaprobación. Reconoce sus sentimientos y ofrece una perspectiva equilibrada para abordar sus inquietudes."
    elif emotion == "disgust":
        return "El usuario presenta disgusto; mantén un tono neutral y comprensivo para abordar su rechazo."
    elif emotion == "embarrassment":
        return "El usuario se siente avergonzado. Responde de forma sensible y apoyadora para ayudarle a recuperar su confianza."
    elif emotion == "excitement":
        return "El usuario está emocionado. Responde con entusiasmo, celebrando sus sentimientos positivos y motivándolo a seguir adelante."
    elif emotion == "fear":
        return "El usuario tiene miedo; ofrécele palabras de aliento y seguridad, y ayúdalo a sentirse protegido."
    elif emotion == "gratitude":
        return "El usuario se siente agradecido. Reconoce su gratitud y fomenta un ambiente positivo y de reconocimiento mutuo."
    elif emotion == "grief":
        return "El usuario muestra signos de duelo o tristeza profunda. Responde con extrema sensibilidad y apoyo para acompañarlo en su dolor."
    elif emotion == "joy":
        return "El usuario se muestra alegre. Responde de manera entusiasta y motivadora, compartiendo su optimismo."
    elif emotion == "love":
        return "El usuario expresa amor. Responde de manera cálida y afectuosa, reconociendo y valorando ese sentimiento."
    elif emotion == "nervousness":
        return "El usuario se siente nervioso. Ofrece palabras de aliento y estrategias para calmar su ansiedad."
    elif emotion == "optimism":
        return "El usuario es optimista. Refuerza su perspectiva positiva y motívalo a continuar con esa actitud constructiva."
    elif emotion == "pride":
        return "El usuario se siente orgulloso. Reconoce su logro y fomenta ese sentimiento de autoafirmación y confianza."
    elif emotion == "realization":
        return "El usuario ha tenido una importante realización. Anímalo a profundizar en esa nueva perspectiva y a aprovecharla para su crecimiento personal."
    elif emotion == "relief":
        return "El usuario experimenta alivio. Reconoce su sensación de mejora y estabilidad, y anímalo a mantener ese estado."
    elif emotion == "remorse":
        return "El usuario siente remordimiento. Responde con empatía, ayudándolo a aprender de la situación y a encontrar el camino hacia el perdón personal."
    elif emotion == "sadness":
        return "El usuario se siente triste y necesita consuelo y apoyo emocional. Responde con empatía y ofreciéndole palabras de aliento."
    elif emotion == "surprise":
        return "El usuario se siente sorprendido; ayuda a procesar su sorpresa de manera clara y brinda contexto para comprender la situación."
    elif emotion == "neutral":
        return "El usuario se encuentra en un estado neutral. Responde de manera equilibrada y objetiva, sin un sesgo emocional marcado."
    else:
        return "El usuario presenta una emoción compleja; responde con empatía y comprensión, considerando que puede tener matices variados."


class ChatbotService:
    def __init__(self):
        self.client = OpenAI(api_key=API_KEY, base_url=API_URL)

    def get_chat_response(self, messages: List[Dict[Literal["role", "content"], str]]) -> Optional[str]:
        """
        Obtiene una respuesta basada en los mensajes de la conversacion enviada.

        :param messages: Lista de mensajes en formato de diccionario con claves "role" y "content".
        :return: Respuesta generada o None si hay un error.
        """
        # Generar texto de contexto a partir de la emoción dominante
        emotional_context = get_emotional_context(max_emotion(messages[-1]["content"]))

        # Agregar un prompt inicial de sistema para definir el comportamiento del chatbot
        system_prompt = {
            "role": "system",
            "content": (
                "Eres un terapeuta virtual amigable y empático especializado en brindar apoyo emocional y orientación psicológica. "
                "Tu objetivo es escuchar activamente a los usuarios, ofrecer respuestas empáticas y ayudarles a reflexionar sobre sus emociones y situaciones. "
                "Habla de manera cálida y profesional, y evita dar diagnósticos médicos o tratamientos. "
                "Ofrece herramientas de afrontamiento, preguntas reflexivas y sugerencias generales para mejorar el bienestar emocional. "
                "Recuerda: tu rol es escuchar y guiar, no juzgar.\n\n"
                f"Información adicional: {emotional_context}"
            )
        }

        return self.get_chatbot_response(system_prompt, messages)

    def get_personality_scores(self, messages: List[Dict[Literal["role", "content"], str]]) -> Optional[str]:
        """
        Obtiene las puntuaciones de personalidad del usuario según el modelo Big Five.

        :param messages: Lista de mensajes en formato de diccionario con claves "role" y "content".
        :return: JSON con las puntuaciones de personalidad o None si hay un error.
        """
    # Prompt de sistema para analizar la personalidad
        system_prompt = {
            "role": "system",
            "content": (
                "Eres un psicólogo virtual especializado en el modelo de personalidad Big Five. "
                "Analiza los mensajes del usuario y devuelve un JSON con las puntuaciones de los cinco rasgos de personalidad: "
                "Apertura (Openness), Responsabilidad (Conscientiousness), Extraversión (Extraversion), Amabilidad (Agreeableness) y Neuroticismo (Neuroticism). "
                "Las puntuaciones deben estar en una escala del 1 al 5, donde 1 es el mínimo y 5 es el máximo. "
                "Quiero que solo respondas con el JSON. El formato del JSON debe ser: "
                '{"openness": puntuacion, "conscientiousness": puntuacion, "extraversion": puntuacion, "agreeableness": puntuacion, "neuroticism": puntuacion}.'
            )
        }

        # Obtener la respuesta del chatbot
        response = self.get_chatbot_response(system_prompt, messages)
        
        if not response:
            raise ValueError("Error del mensaje")

        # Intentar parsear la respuesta como JSON
        try:
            personality_scores = json.loads(response)
            return personality_scores
        except json.JSONDecodeError:
            return None

    def get_emotional_advice(self, messages: List[Dict[Literal["role", "content"], str]]) -> Optional[str]:
        """
        Proporciona consejos personalizados según el tipo emocional del usuario.

        :param messages: Lista de mensajes en formato de diccionario con claves "role" y "content".
        :return: Consejos personalizados o None si hay un error.
        """
        # Prompt de sistema para dar consejos emocionales
        system_prompt = {
            "role": "system",
            "content": (
                "Eres un terapeuta virtual especializado en bienestar emocional. "
                "Analiza los mensajes del usuario y proporciona consejos personalizados para mejorar su bienestar emocional. "
                "Los consejos deben basarse en el tipo emocional del usuario (por ejemplo, si muestra ansiedad, estrés, tristeza, etc.). "
                "Sé empático, profesional y ofrece herramientas prácticas para afrontar las emociones. "
                "Evita dar diagnósticos médicos o tratamientos específicos."
                "Retorna 4 oraciones separadas por salto de línea con los consejos que sean estilo Consejo: descripción"
            )
        }

        # Obtener la respuesta del chatbot
        response = self.get_chatbot_response(system_prompt, messages)

        return response

    def get_chatbot_response(self, system_prompt: dict, messages: List[Dict[Literal["role", "content"], str]]) -> Optional[str]:
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
