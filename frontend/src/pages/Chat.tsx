import React, { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/messages"; // Reemplaza con la URL de tu API

const quickQuestions = [
    "Hoy me siento triste y no sé por qué.",
    "Quiero mejorar mi autoestima.",
    "¿Cómo puedo manejar el estrés?",
    "¿Cómo funciona este chatbot?",
];

interface Chat {
    id: string;
    title: string;
    messages: { text: string; sender: "user" | "bot" }[];
}

const Chat: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
    const [hasSentMessage, setHasSentMessage] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const navigate = useNavigate();


    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleNewChat = () => {
        const newChat: Chat = {
            id: String(Date.now()),
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

    /**
     * Envía un mensaje a la API y obtiene la respuesta del chatbot.
     */
    const sendMessage = async (message: string) => {
        // Verificar si el usuario está autenticado
        const token = localStorage.getItem("token");
        if (!token) {
            setShowAuthPopup(true); // Mostrar pop-up de autenticación
            return;
        }
        setHasSentMessage(true);

        // Mensaje del usuario con tipado correcto
        const newMessage: { text: string; sender: "user" | "bot" } = {
            text: message,
            sender: "user",
        };

        let chatId = selectedChat;

        // Si no hay chat seleccionado, creamos uno automáticamente
        if (!chatId) {
            const newChat: Chat = {
                id: String(Date.now()),
                title: generateChatTitle(message),
                messages: [newMessage], // Iniciamos con el primer mensaje
            };

            setChats((prevChats) => [newChat, ...prevChats]);
            setSelectedChat(newChat.id);
            setMessages([newMessage]); // ✅ Reiniciamos los mensajes en pantalla
            chatId = newChat.id;
        } else {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }

        try {
            //  Enviar mensaje a la API
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text: message }),
            });

            if (!response.ok) {
                throw new Error("Error al obtener la respuesta del chatbot");
            }

            // Obtener la respuesta del chatbot
            const data = await response.json();
            const botResponse: { text: string; sender: "user" | "bot" } = {
                text: data.text,
                sender: "bot",
            };

            // Agregar la respuesta del chatbot al estado
            setMessages((prevMessages) => [...prevMessages, botResponse]);

            // Actualizar la conversación en el chat seleccionado
            setChats((prevChats) =>
                prevChats.map((chat) => {
                    if (chat.id === selectedChat) {
                        const updatedMessages = [...chat.messages, newMessage, botResponse];

                        // Si el título aún es "Nuevo Chat", actualizarlo
                        const newTitle =
                            chat.title === "Nuevo Chat" ? generateChatTitle(message) : chat.title;

                        return { ...chat, title: newTitle, messages: updatedMessages };
                    }
                    return chat;
                })
            );
            // Si se produce un error ponemos un mensaje de error en el chat
        } catch (error) {
            console.error("Error al comunicarse con la API:", error);
            const botErrorResponse: { text: string; sender: "user" | "bot" } = {
                text: "Lo siento, no pude procesar tu solicitud.",
                sender: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, botErrorResponse]);

            // ✅ Guardar el chat aunque haya error
            setChats((prevChats) =>
                prevChats.map((chat) => {
                    if (chat.id === chatId) {
                        const updatedMessages = [...chat.messages, newMessage, botErrorResponse];

                        const newTitle =
                            chat.title === "Nuevo Chat" ? generateChatTitle(message) : chat.title;

                        return { ...chat, title: newTitle, messages: updatedMessages };
                    }
                    return chat;
                })
            );
        }
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
                {/* ✅ Encabezado */}
                <Header />

                <div className="flex flex-1 w-full bg-primary">

                    {/* ✅ Botón para mostrar/ocultar el Sidebar */}
                    {!sidebarVisible && (
                        <motion.button
                            initial={{ opacity: 0, x: -30 }} // 🔹 Comienza oculto y más a la izquierda
                            animate={{ opacity: 1, x: 0 }} // 🔹 Se desliza hacia su posición normal
                            exit={{ opacity: 0, x: -30 }} // 🔹 Se desliza de nuevo hacia la izquierda al desaparecer
                            transition={{ duration: 0.3, ease: "easeOut" }} // 🔹 Suave animación
                            className="absolute top-20 left-5 bg-secondary text-white p-2 rounded-lg z-50"
                            onClick={toggleSidebar}
                        >
                            <Menu size={24} />
                        </motion.button>
                    )}

                    {/* ✅ Sidebar con lista de chats */}
                    <AnimatePresence>
                        {sidebarVisible && (
                            <ChatSidebar
                                chats={chats}
                                selectedChat={selectedChat}
                                onSelectChat={handleSelectChat}
                                onNewChat={handleNewChat}
                                toggleSidebar={toggleSidebar}
                            />
                        )}
                    </AnimatePresence>


                    <div className="flex flex-col flex-1 h-full">
                        {/* ✅ Preguntas rápidas antes de enviar mensajes */}
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

                        {/* ✅ Área de mensajes con desplazamiento */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-160px)]">
                            <ChatMessages messages={messages} />
                        </div>

                        {/* ✅ Input de texto para enviar mensajes */}
                        <div className="border-t bg-white p-4 sticky bottom-0 w-full flex items-center justify-center">
                            <div className="w-full max-w-5xl">
                                <ChatInput sendMessage={sendMessage} />
                            </div>
                        </div>


                    </div>
                </div>
            </motion.div>
            {/* Pop-up de autenticación */}
            {showAuthPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Debes estar registrado</h2>
                        <p className="mb-4">Para usar esta función, inicia sesión o regístrate.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Registrarse
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
