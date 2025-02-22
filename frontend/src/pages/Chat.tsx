import React, { useState } from "react";
import { FaUserCircle, FaComments, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ChatPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const [userMessage, setUserMessage] = useState(""); // Estado para el mensaje del usuario
  const [apiResponse, setApiResponse] = useState(""); // Estado para la respuesta de la API

  const handleSendMessage = async () => {
      try {
          // Llamar a la API con el mensaje del usuario
          const response = await fetch("http://0.0.0.0:8000/messages", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: "1", text: userMessage }),
          });

          if (!response.ok) {
              throw new Error("Error al llamar a la API");
          }

          const data = await response.json();
          setApiResponse(data.message); // Asumimos que la API devuelve un objeto con un campo "message"
      } catch (error) {
          console.error("Error:", error);
          setApiResponse("Hubo un error al procesar tu mensaje.");
      }
  };

  return (
    <div className="flex flex-1 w-full bg-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar h-full p-4 flex flex-col">
        <div className="flex justify-center mb-6">
          <FaComments className="text-4xl text-third" />
        </div>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center px-4 py-2 rounded-lg w-full ${activeTab === "chat" ? "bg-third text-white" : "text-gray-700 hover:bg-gray-200"}`}
          >
            <FaComments className="mr-2" />
            Chat
          </button>
          <button
            onClick={() => setActiveTab("historial")}
            className={`flex items-center px-4 py-2 rounded-lg w-full ${activeTab === "historial" ? "bg-third text-white" : "text-gray-700 hover:bg-gray-200"}`}
          >
            Historial
          </button>
          <button
            onClick={() => setActiveTab("configuracion")}
            className={`flex items-center px-4 py-2 rounded-lg w-full ${activeTab === "configuracion" ? "bg-third text-white" : "text-gray-700 hover:bg-gray-200"}`}
          >
            <FaCog className="mr-2" />
            Configuración
          </button>
        </nav>
      </aside>
      
      {/* Contenido Principal */}
      <main className="flex-1 p-8 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <FaComments className="text-5xl text-third mb-2" />
          <h2 className="text-xl text-gray-700">Tu asistente emocional</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 w-full max-w-4xl">
            <div className="border rounded-lg p-4 text-center hover:shadow-md cursor-pointer">
              <p>Hoy me siento triste y no sé por qué.</p>
            </div>
            <div className="border rounded-lg p-4 text-center hover:shadow-md cursor-pointer">
              <p>Quiero mejorar mi autoestima</p>
            </div>
            <div className="border rounded-lg p-4 text-center hover:shadow-md cursor-pointer">
              <p>¿Cómo puedo manejar el estrés?</p>
            </div>
            <div className="border rounded-lg p-4 text-center hover:shadow-md cursor-pointer">
              <p>¿Cómo funciona este chatbot?</p>
            </div>
          </div>
          <div className="mt-10 w-full max-w-2xl flex items-center border rounded-lg p-2">
          <input
          type="text"
          placeholder="Escribe aquí tu prompt"
          className="flex-1 p-2 outline-none"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          />
          <button
          className="px-4 py-2 bg-third text-white rounded-lg ml-2"
          onClick={handleSendMessage}
          >
          Enviar
          </button>
          </div>
          {apiResponse && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full max-w-2xl">
              <p>{apiResponse}</p>
              </div>
          )}
          </div>
          </main>
          </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-white min-h-screen w-full max-w-full overflow-hidden flex flex-col">
      <Header />
      <div className="flex flex-1 w-full">
        <ChatPage />
      </div>
    </div>
  );
};

export default App;
