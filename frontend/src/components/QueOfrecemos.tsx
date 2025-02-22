import React from "react";

const QueOfrecemos: React.FC = () => {
  return (
    <section className="w-full bg-landing2Bg py-16 px-8">
      <div className="container px-16 mx-auto">
        {/* Título */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          ¿Qué ofrecemos?
        </h2>

        {/* Contenedor con grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Columna izquierda */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Chatbot de Apoyo Emocional
              </h3>
              <p className="text-gray-600">
                Tu compañero digital, siempre disponible para apoyarte. Nuestro chatbot detecta tus emociones en tiempo real, te responde con empatía y te ofrece orientación personalizada.
              </p>
              <p className="mt-2">📌 <span className="text-gray-700">Habla con él cuando lo necesites.</span></p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Descubre tu Perfil de Personalidad
              </h3>
              <p className="text-gray-600">
                Descubre quién eres y cómo crecer. Analizamos tu personalidad con Eneagrama y Big Five para ofrecerte un perfil detallado y recomendaciones personalizadas.
              </p>
              <p className="mt-2">📌 <span className="text-gray-700">El autoconocimiento es el primer paso hacia el bienestar.</span></p>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Diario Emocional Inteligente
              </h3>
              <p className="text-gray-600">
                Registra, reflexiona y comprende tus emociones. Nuestro diario digital analiza tu estado de ánimo, guarda tu evolución y te ayuda a procesar lo que sientes de forma segura.
              </p>
              <p className="mt-2">📌 <span className="text-gray-700">Un espacio solo para ti.</span></p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Coach de Bienestar y Objetivos
              </h3>
              <p className="text-gray-600">
                Avanza a tu propio ritmo. Nuestra IA te guía con objetivos personalizados, estrategias de bienestar y recomendaciones para superar bloqueos emocionales.
              </p>
              <p className="mt-2">📌 <span className="text-gray-700">Construye hábitos positivos y fortalece tu bienestar.</span></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QueOfrecemos;
