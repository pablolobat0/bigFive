import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Define el nombre del modelo GoEmotions
model_name = "SamLowe/roberta-base-go_emotions"

# Carga el tokenizer y el modelo
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def softmax(x):
    x_exp = np.exp(x - np.max(x))
    return x_exp / x_exp.sum()

# Función para obtener emociones con el modelo GoEmotions
def get_emotions(texto):
    inputs = tokenizer(texto, return_tensors="pt", truncation=True)
    outputs = model(**inputs)
    #scores = torch.softmax(outputs.logits, dim=1).detach().cpu().numpy()[0]
    logits = outputs.logits.detach().cpu().numpy()[0]
    scores = softmax(logits)    
    etiquetas = model.config.id2label
    resultados = {etiquetas[i]: float(scores[i]) for i in range(len(scores))}
    return resultados
