import React, { useState } from "react";
import { motion } from "framer-motion";

interface ChatInputProps {
  sendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita el salto de línea en el input
      handleSend();
    }
  };

  return (
    <div className="w-full flex items-center border rounded-lg p-2 bg-white">
        <input
            type="text"
            placeholder="Escribe aquí tu mensaje..."
            className="flex-1 p-2 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        <motion.button
            className="px-4 py-2 bg-third text-white rounded-lg ml-2"
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
        >
            Enviar
        </motion.button>
    </div>
  );
};

export default ChatInput;
