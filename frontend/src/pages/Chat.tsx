import React, { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import Header from "../components/Header";
import { motion } from "framer-motion";

const quickQuestions = [
  "Hoy me siento triste y no sé por qué.",
  "Quiero mejorar mi autoestima.",
  "¿Cómo puedo manejar el estrés?",
  "¿Cómo funciona este chatbot?",
];

const Chat: React.FC = () => {
  const [chats, setChats] = useState<
    { id: string; title: string; messages: { text: string; sender: "user" | "bot" }[] }[]
  >([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [hasSentMessage, setHasSentMessage] = useState(false);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "Nuevo Chat",
      messages: [],
    };
    setChats([newChat, ...chats]);
    setSelectedChat(newChat.id);
    setMessages([]);
    setHasSentMessage(false);
  };

  const handleSelectChat = (id: string) => {
    const chat = chats.find((chat) => chat.id === id);
    if (chat) {
      setSelectedChat(id);
      setMessages(chat.messages);
      setHasSentMessage(chat.messages.length > 0);
    }
  };

  const generateChatTitle = (text: string): string => {
    return text.split(" ").slice(0, 3).join(" ") || "Nuevo Chat";
  };

  const sendMessage = (message: string) => {
    setHasSentMessage(true);
    const newMessage = { text: message, sender: "user" as "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setTimeout(() => {
      const botResponse = { text: "Esta es una respuesta automática del bot.", sender: "bot" as "bot" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === selectedChat) {
            const updatedMessages = [...chat.messages, newMessage, botResponse];

            const newTitle = chat.title === "Nuevo Chat" ? generateChatTitle(message) : chat.title;

            return { ...chat, title: newTitle, messages: updatedMessages };
          }
          return chat;
        })
      );
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 20 }} 
        transition={{ duration: 0.4 }}
        className="flex flex-col h-screen w-full"
      >
        <Header />

        <div className="flex flex-1 w-full bg-primary">
          <ChatSidebar chats={chats} selectedChat={selectedChat} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />

          <div className="flex flex-col flex-1 h-full">
            {/* ✅ Preguntas rápidas centradas y en cuadrícula de 2x2 */}
            {!hasSentMessage && (
              <div className="flex flex-1 items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg text-center"
                >
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-lg transition shadow-lg"
                      onClick={() => sendMessage(question)}
                    >
                      {question}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Área de mensajes con desplazamiento */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-160px)]">
              <ChatMessages messages={messages} />
            </div>

            {/* Input de texto */}
            <div className="border-t bg-white p-4 sticky bottom-0 w-full">
              <ChatInput sendMessage={sendMessage} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
