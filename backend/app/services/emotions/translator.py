from transformers import MarianMTModel, MarianTokenizer

# Cargar el modelo de traducción de español a inglés
model_name_trans = "Helsinki-NLP/opus-mt-es-en"
translator_tokenizer = MarianTokenizer.from_pretrained(model_name_trans)
translator_model = MarianMTModel.from_pretrained(model_name_trans)

def translate_es_en(texto):
    inputs = translator_tokenizer(texto, return_tensors="pt", truncation=True)
    translated = translator_model.generate(**inputs)
    texto_en = translator_tokenizer.decode(translated[0], skip_special_tokens=True)
    return texto_en
