import React from "react";

const NoteEditor = ({ note, onUpdateNote, onDeleteNote }: any) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote({ ...note, content: e.target.value });
  };

  return (
    <section className="w-2/3 p-6 bg-gray-100 flex flex-col relative">
      {/* Botón de eliminar */}
      <button
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        onClick={() => onDeleteNote(note.id)}
      >
        Eliminar
      </button>

      <input
        className="text-xl font-bold mb-2 bg-transparent border-none focus:outline-none text-gray-700"
        value={note.title}
        onChange={handleTitleChange}
      />
      <textarea
        className="w-full flex-1 p-4 bg-transparent border-none resize-none focus:outline-none text-gray-700 overflow-y-auto"
        value={note.content}
        onChange={handleContentChange}
        placeholder="Escribe aquí..."
        style={{
            backgroundImage: "linear-gradient(transparent 90%, rgba(0,0,0,0.1) 10%)",
            backgroundSize: "100% 2rem",
            lineHeight: "2rem",
            backgroundAttachment: "local", // Permite que las líneas se muevan con el scroll
            backgroundPosition: "0 1.8rem", // Ajusta la posición vertical del fondo
            paddingTop: "0.2rem", // Ajusta el padding superior para alinear el texto con las líneas
        }}
      />
    </section>
  );
};

export default NoteEditor;
