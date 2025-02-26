import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react"; // Ícono para cerrar el Sidebar

interface ChatSidebarProps {
  chats: { id: string; title: string }[];
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  toggleSidebar: () => void; // ✅ Agregamos la función para cerrar el Sidebar
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, selectedChat, onSelectChat, onNewChat, toggleSidebar }) => {
  return (
    <motion.aside 
      initial={{ x: -250, opacity: 0 }} // 🔹 Comienza fuera de la pantalla
      animate={{ x: 0, opacity: 1 }} // 🔹 Se desliza hacia dentro y se hace visible
      exit={{ x: -250, opacity: 0 }} // 🔹 Se desliza hacia fuera y se desvanece
      transition={{ duration: 0.3, ease: "easeOut" }} // 🔹 Animación suave
      className="w-64 bg-sidebar h-full p-4 flex flex-col rounded-lg relative shadow-lg"
    >
      {/* ✅ Botón para cerrar Sidebar (dentro del Sidebar, encima de "Nuevo Chat") */}
      <button 
        className="absolute top- left-4 bg-secondary text-white p-1 rounded-lg z-50 hover:bg-opacity-90 transition"
        onClick={toggleSidebar}
      >
        <X size={24} />
      </button>

      {/* ✅ Botón para iniciar un nuevo chat */}
      <button
        className="mb-4 mt-10 bg-secondary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
        onClick={onNewChat}
      >
        + Nuevo Chat
      </button>

      {/* ✅ Lista de chats con scroll si es necesario */}
      <div className="flex-1 max-h-[70vh] overflow-y-auto mt-2">
        {chats.map((chat) => (
          <motion.button
            key={chat.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`block w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
              selectedChat === chat.id ? "bg-third text-white" : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <h3 className="font-bold truncate">{chat.title}</h3>
          </motion.button>
        ))}
      </div>
    </motion.aside>
  );
};

export default ChatSidebar;
