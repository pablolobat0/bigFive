import React from "react";

interface ChatMessagesProps {
  messages: { text: string; sender: "user" | "bot" }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-2xl mx-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg max-w-xs ${
            msg.sender === "user"
              ? "bg-third text-white self-end"
              : "bg-gray-200 text-gray-800 self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
