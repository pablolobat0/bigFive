import React from "react";

const Pasos: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-8">
      <div className="container mx-auto">
        
        {/* Título */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          ¿Qué pasos debo seguir?
        </h2>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tarjeta 1 */}
          <div className="bg-green-100 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Regístrate y crea tu perfil.
            </h3>
            <img src="/img-register.jpg" alt="Registro" className="w-32 h-32 mb-4" />
            <button className="bg-primary border border-secondary text-secondary px-4 py-2 rounded-lg hover:bg-secondary/20 transition">
              Registrarse
            </button>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-green-200 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Habla con el chatbot y registra tu día.
            </h3>
            <img src="/img-chatbot.jpg" alt="Chatbot" className="w-32 h-32 mb-4" />
            <button className="bg-primary border border-secondary text-secondary px-4 py-2 rounded-lg hover:bg-secondary/20 transition">
              Hablar
            </button>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-orange-100 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Recibe análisis personalizados y recomendaciones.
            </h3>
            <img src="/img-coach.jpg" alt="Coach" className="w-32 h-32 mb-4" />
            <button className="bg-primary border border-secondary text-secondary px-4 py-2 rounded-lg hover:bg-secondary/20 transition">
              Coach
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pasos;
