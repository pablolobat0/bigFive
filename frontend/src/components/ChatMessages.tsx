import React from "react";
import { motion } from "framer-motion";

interface ChatMessagesProps {
  messages: { text: string; sender: "user" | "bot" }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-5xl mx-auto">
      {messages.map((msg, index) => (
        
        <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.sender === "user" ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`p-3 rounded-lg max-w-5xl ${
            msg.sender === "user"
                ? "bg-third text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
        >
          {msg.text}
        </motion.div>
      ))}
    </div>
  );
};

export default ChatMessages;
