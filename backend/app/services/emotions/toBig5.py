# Mapping emotions for each Big Five personality trait
big5_map = {
    "Extraversion": ["joy", "admimration", "excitement", "amusement", "optimism", "approval", "realization", "pride"],
    "Agreeableness": ["love" "gratitude", "caring", "admimration"],
    "Conscientiousness": ["disapproval", "remorse", "relief", "neutral"],
    "Neuroticism": ["sadness", "anger", "fear", "disgust", "annoyance", "nervousness", "grief", "disgust", "embarrassment", "disappointment", "disapproval", "remorse"],
    "Openness": ["curiosity", "surprise", "desire", "confusion", "excitement", "amusement"]
}

# Point range based on BFI-44
bfi_ranges = {
    "Neuroticism": (8, 40),
    "Extraversion": (7, 35),
    "Openness": (10, 50),
    "Agreeableness": (9, 45),
    "Conscientiousness": (9, 45)
}

# Function to calculate the Big Five personality traits from the GoEmotions results
def calculate_big5(emotions_results):
    big5_scores = {trait: 0 for trait in big5_map.keys()}
    
    # Weighting based on the probability of each emotion
    for trait, emotions in big5_map.items():
        total_probability = sum([emotions_results.get(emotion, 0) for emotion in emotions])
        big5_scores[trait] = total_probability
    
    return big5_scores

# Function to scale GoEmotions scores to BFI-44
def scale_scores(go_emotions_scores):
    bfi_scaled_scores = {}
    
    for trait, value in go_emotions_scores.items():
        min_bfi, max_bfi = bfi_ranges[trait]
        # Scale to BFI-44 range
        scaled_score = value * (max_bfi - min_bfi) + min_bfi
        bfi_scaled_scores[trait] = round(scaled_score, 2)
    
    return bfi_scaled_scores

# Update the scores with a weighted moving average
def update_big5(previous, new, alpha):
    return {trait: round((alpha * new[trait]) + ((1 - alpha) * previous[trait]), 2) for trait in previous}
