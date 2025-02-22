from translator import *
from emotionsModel import *
from toBig5 import bfi_range,update_big5,get_big5,scalate
alpha = 0.3 # Si 0.3, da un 30% de peso a la nueva info y 70% a la anterior

def update_personality(texto_es, big5_puntajes_previos) -> dict:
    texto_en = translate_es_en(texto_es)
    resultados_emociones = get_emotions(texto_en)
    big5_resultados = get_big5(resultados_emociones)

    big5_escalado = scalate(big5_resultados, bfi_range)

    big5_puntajes_actualizados = update_big5(big5_puntajes_previos, big5_escalado, alpha)
    print("\nPuntajes previos:\n", big5_puntajes_previos)
    print("Puntajes del texto:\n", big5_escalado)
    print("Puntajes actualizados:")

    return big5_puntajes_actualizados


