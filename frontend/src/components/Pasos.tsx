import React from "react";
import register from "../assets/register.png";
import chatbot from "../assets/chatbot.png";
import coach from "../assets/coach.png";

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
          <div className="bg-[#F4F4F4] p-6 rounded-xl shadow-md flex flex-col justify-between h-72">
            <h3 className="text-2xl font-semibold text-gray-900 text-left flex-1">
              Regístrate y crea tu perfil.
            </h3>
            <div className="flex items-end justify-between w-full">
              <div className="mt-auto">
                <button className="bg-white border border-secondary text-secondary px-6 py-4 rounded-lg hover:bg-secondary/20 transition self-start">
                  Registrarse
                </button>
              </div>
              <img
                src={register}
                alt="Registro"
                className="w-36 h-36 self-end"
              />
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-[#BFD7D0] p-6 rounded-xl shadow-md flex flex-col justify-between h-72">
            <h3 className="text-2xl font-semibold text-gray-900 text-left flex-1">
              Habla con el chatbot y registra tu día.
            </h3>
            <div className="flex items-end justify-between w-full">
              <div className="mt-auto">
                <button className="bg-white border border-secondary text-secondary px-6 py-4 rounded-lg hover:bg-secondary/20 transition">
                  Hablar
                </button>
              </div>
              <img src={chatbot} alt="Chatbot" className="w-36 h-36 self-end" />
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-[#FFE5D5] p-6 rounded-xl shadow-md flex flex-col justify-between h-72">
            <h3 className="text-2xl font-semibold text-gray-900 text-left flex-1">
              Recibe análisis personalizados y recomendaciones.
            </h3>
            <div className="flex items-end justify-between w-full">
              <div className="mt-auto">
                <button className="bg-white border border-secondary text-secondary px-6 py-4 rounded-lg hover:bg-secondary/20 transition">
                  Coach
                </button>
              </div>
              <img src={coach} alt="Coach" className="w-36 h-36 self-end" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pasos;
