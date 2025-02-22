import React, { useState, useEffect, useRef } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import Header from "../components/Header";

const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Esta es una respuesta automática del bot.", sender: "bot" },
      ]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header fijo en la parte superior */}
      <Header />

      <div className="flex flex-1 w-full bg-primary">
        {/* Sidebar fijo a la izquierda */}
        <ChatSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Contenedor del chat */}
        <div className="flex flex-col flex-1 h-full">
          {/* Área de mensajes con scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-160px)]">
            <ChatMessages messages={messages} />
            <div ref={messagesEndRef} />
          </div>

          {/* Input del chat fijo abajo */}
          <div className="border-t bg-white p-4 sticky bottom-0 w-full">
            <ChatInput sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
