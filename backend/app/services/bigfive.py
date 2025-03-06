import torch
import torch.nn as nn
import numpy as np
from transformers import AutoModelForSequenceClassification


class BigFiveAnalyzer:
    def __init__(
        self, model_name: str = "SamLowe/roberta-base-go_emotions", input_dim=384
    ):
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)

        expected_dim = self.model.config.hidden_size

        # The default dim is the number of dim used by the model of Weaviate
        if input_dim != expected_dim:
            self.projection = nn.Linear(input_dim, expected_dim)
        else:
            self.projection = None

        self.bigfive_map = {
            "admiration": "agreeableness",
            "amusement": "extraversion",
            "anger": "neuroticism",
            "annoyance": "neuroticism",
            "approval": "agreeableness",
            "caring": "agreeableness",
            "confusion": "openness",
            "curiosity": "openness",
            "desire": "extraversion",
            "disappointment": "neuroticism",
            "disapproval": "conscientiousness",
            "disgust": "neuroticism",
            "embarrassment": "neuroticism",
            "excitement": "extraversion",
            "fear": "neuroticism",
            "gratitude": "agreeableness",
            "grief": "neuroticism",
            "joy": "extraversion",
            "love": "agreeableness",
            "nervousness": "neuroticism",
            "optimism": "extraversion",
            "pride": "conscientiousness",
            "realization": "openness",
            "relief": "agreeableness",
            "remorse": "conscientiousness",
            "sadness": "neuroticism",
            "surprise": "openness",
        }

    def map_to_big_five(self, emotion_scores):
        big_five_scores = {
            "openness": 0.0,
            "conscientiousness": 0.0,
            "extraversion": 0.0,
            "agreeableness": 0.0,
            "neuroticism": 0.0,
        }
        for emotion in emotion_scores:
            label = emotion["label"].lower()
            score = emotion["score"]
            if label in self.bigfive_map:
                trait = self.bigfive_map[label]
                big_five_scores[trait] += score
        return big_five_scores

    def scalate(self, go_emotions_scores):
        bfi_scaled = {}
        for trait, value in go_emotions_scores.items():
            # Scalate the value to the range 0-10
            scaled_score = value * 10
            bfi_scaled[trait] = round(scaled_score, 2)
        return bfi_scaled

    def analyze_from_embedding(self, embedding: np.ndarray) -> dict:
        """
        Analiza la personalidad Big Five a partir de un embedding.

        Args:
            embedding (np.ndarray): El embedding (vector) de la entrada.

        Returns:
            dict: Un diccionario con las puntuaciones de los cinco rasgos.
        """

        # Convertir a tensor de PyTorch
        vector_tensor = torch.tensor(embedding, dtype=torch.float)

        if vector_tensor.ndim == 1:
            vector_tensor = vector_tensor.unsqueeze(0).unsqueeze(1)
        elif vector_tensor.ndim == 2:
            vector_tensor = vector_tensor.unsqueeze(1)

        if self.projection is not None:
            vector_tensor = self.projection(vector_tensor)

        # Pasar el embedding por el modelo
        with torch.no_grad():
            outputs = self.model.classifier(vector_tensor)

        scores = torch.softmax(outputs, dim=-1).squeeze().tolist()

        emotion_scores = []
        for i, score in enumerate(scores):
            label = self.model.config.id2label[i].lower()
            emotion_scores.append({"label": label, "score": score})

        # Mapear las emociones al modelo Big Five
        big_five_scores = self.map_to_big_five(emotion_scores)

        return self.scalate(big_five_scores)
