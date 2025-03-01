import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
#import torch

# Define the GoEmotions model name
model_name = "SamLowe/roberta-base-go_emotions"

# Tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)


def softmax(x):
    x_exp = np.exp(x - np.max(x))
    return x_exp / x_exp.sum()


# Function to get the emotions from a text
def get_emotions(texto):
    inputs = tokenizer(texto, return_tensors="pt", truncation=True)
    outputs = model(**inputs)
    #scores = torch.softmax(outputs.logits, dim=1).detach().cpu().numpy()[0]
    
    logits = outputs.logits.detach().cpu().numpy()[0]
    scores = softmax(logits)
    
    labels = model.config.id2label
    results = {labels[i]: float(scores[i]) for i in range(len(scores))}
    return results