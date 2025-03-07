import numpy as np
from app.models.user import Emotions
from app.services.bigfive import BigFiveAnalyzer
from app.weaviate.utils import (
    get_chat_history_embbeding,
    get_user_entries,
)


analyzer = BigFiveAnalyzer()


def analyze_user_personality(user_id: str) -> Emotions:
    embeddings = get_user_entries(user_id)

    messages_embbedings = get_chat_history_embbeding(user_id)

    for e in messages_embbedings:
        embeddings.append(e)

    if not embeddings:
        raise ValueError("No se encontraron embeddings válidos para el usuario.")

    avg_embedding = np.mean(embeddings, axis=0)

    scores = analyzer.analyze_from_embedding(avg_embedding)

    return Emotions(**scores)
