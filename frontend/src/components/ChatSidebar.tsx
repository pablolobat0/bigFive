import React from "react";

interface ChatSidebarProps {
  chats: { id: string; title: string }[];
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, selectedChat, onSelectChat, onNewChat }) => {
  return (
    <aside className="w-64 bg-sidebar h-full p-4 flex flex-col rounded-lg">
      {/* Botón para iniciar un nuevo chat */}
      <button
        className="mb-4 bg-secondary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
        onClick={onNewChat}
      >
        + Nuevo Chat
      </button>

      {/* Lista de chats con scroll si es necesario */}
      <div className="flex-1 max-h-[70vh] overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={`block w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
              selectedChat === chat.id ? "bg-third text-white" : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <h3 className="font-bold truncate">{chat.title}</h3>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;
