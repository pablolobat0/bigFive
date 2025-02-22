import React from "react";

const NoteEditor = ({ note, onUpdateNote }: any) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote({ ...note, content: e.target.value });
  };

  return (
    <section className="w-2/3 p-6 bg-gray-100 flex flex-col">
      <input
        className="text-xl font-bold mb-2 bg-transparent border-none focus:outline-none text-gray-700"
        value={note.title}
        onChange={handleTitleChange}
      />
      <textarea
        className="w-full flex-1 p-4 bg-transparent border-none resize-none focus:outline-none text-gray-700"
        value={note.content}
        onChange={handleContentChange}
        placeholder="Escribe aquí..."
        style={{
          backgroundImage: "linear-gradient(transparent 95%, rgba(0,0,0,0.1) 5%)",
          backgroundSize: "100% 2rem",
          lineHeight: "2rem",
        }}
      />
    </section>
  );
};

export default NoteEditor;
