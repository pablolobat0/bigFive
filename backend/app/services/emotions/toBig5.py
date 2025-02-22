# Define el mapeo entre emociones y Big Five
big5_map = {
    "Neuroticism": ["sadness", "anger", "fear", "disgust", "annoyance", "nervousness", "grief", "disgust", "embarrassment", "disappointment"],
    "Extraversion": ["joy", "admimration", "excitement", "amusement", "optimism", "pride"],
    "Openness": ["curiosity", "surprise", "realization", "desire", "confusion"],
    "Agreeableness": ["love" "gratitude", "caring"],
    "Conscientiousness": ["disapproval", "remorse", "relief", "approval"]
}

# Rango de puntajes en el BFI-44
bfi_range = {
    "Neuroticism": (8, 40),
    "Extraversion": (7, 35),
    "Openness": (10, 50),
    "Agreeableness": (9, 45),
    "Conscientiousness": (9, 45)
}

# Función para calcular Big Five basado en emociones
def get_big5(emociones_resultados):
    big5_scores = {trait: 0 for trait in big5_map.keys()}
    
    # Ponderación basada en la probabilidad de cada emoción
    for trait, emociones in big5_map.items():
        total_probabilidad = sum([emociones_resultados.get(emocion, 0) for emocion in emociones])
        big5_scores[trait] = total_probabilidad
    
    return big5_scores


# Función para escalar los puntajes de GoEmotions al BFI-44
def scalate(go_emotions_puntajes, bfi_range):
    bfi_puntajes_escalados = {}

    for rasgo, valor in go_emotions_puntajes.items():
        min_bfi, max_bfi = bfi_range[rasgo]
        # Escalar al rango del BFI-44
        puntaje_escalado = valor * (max_bfi - min_bfi) + min_bfi
        bfi_puntajes_escalados[rasgo] = round(puntaje_escalado, 2)

    return bfi_puntajes_escalados

# Actualizar los puntajes con media móvil ponderada
def update_big5(previos, nuevos, alpha):
    return {rasgo: round((alpha * nuevos[rasgo]) + ((1 - alpha) * previos[rasgo]), 2) for rasgo in previos}
