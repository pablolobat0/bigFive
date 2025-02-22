from translator import *
from emotionsModel import *
from toBig5 import *
import json

def update_personality(texto_es, big5_puntajes_previos, bfi_rangos, alpha):
    texto_en = translate_es_en(texto_es)
    resultados_emociones = get_emotions(texto_en)
    big5_resultados = get_big5(resultados_emociones)

    big5_escalado = scalate(big5_resultados, bfi_rangos)

    big5_puntajes_actualizados = update_big5(big5_puntajes_previos, big5_escalado, alpha)
    print("\nPuntajes previos:\n", big5_puntajes_previos)
    print("Puntajes del texto:\n", big5_escalado)
    print("Puntajes actualizados:")

    json_big5 = json.dumps(big5_puntajes_actualizados, indent=4)

    return json_big5


# Textos de prueba
texto = "Hoy me sentí un poco triste al despertar, pero rápidamente hice una lista de cosas divertidas para hacer y me lancé a planificar mi próximo viaje. No soporto quedarme atrapado en pensamientos negativos."

big5_puntajes_previos = {
    "Neuroticism": 20,
    "Extraversion": 25,
    "Openness": 40,
    "Agreeableness": 30,
    "Conscientiousness": 35
}

alpha = 0.3 # Si 0.3, da un 30% de peso a la nueva info y 70% a la anterior
print(update_personality(texto, big5_puntajes_previos, bfi_range, alpha))