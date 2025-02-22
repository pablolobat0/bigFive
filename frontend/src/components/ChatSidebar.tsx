import React from "react";
import { FaComments, FaCog } from "react-icons/fa";

interface ChatSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-sidebar h-full p-4 flex flex-col">
      <div className="flex justify-center mb-6">
        <FaComments className="text-4xl text-third" />
      </div>
      <nav className="space-y-4">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center px-4 py-2 rounded-lg w-full ${
            activeTab === "chat" ? "bg-third text-white" : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaComments className="mr-2" />
          Chat
        </button>
        <button
          onClick={() => setActiveTab("historial")}
          className={`flex items-center px-4 py-2 rounded-lg w-full ${
            activeTab === "historial" ? "bg-third text-white" : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Historial
        </button>
        <button
          onClick={() => setActiveTab("configuracion")}
          className={`flex items-center px-4 py-2 rounded-lg w-full ${
            activeTab === "configuracion" ? "bg-third text-white" : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaCog className="mr-2" />
          Configuración
        </button>
      </nav>
    </aside>
  );
};

export default ChatSidebar;
