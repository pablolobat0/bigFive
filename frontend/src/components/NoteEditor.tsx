import React, { useState, useEffect } from "react";

interface NoteEditorProps {
  note: any;
  onUpdateNote: (note: any) => void;
  onDeleteNote: (noteId: number) => void;
  isSaving: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdateNote, onDeleteNote, isSaving }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Actualizar el estado interno cuando cambia la nota seleccionada
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleSave = () => {
    const updatedNote = { ...note, title, content };
    onUpdateNote(updatedNote);
  };

  return (
    <div className="flex-1 flex flex-col ml-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-bold mb-4 p-2 border-b border-gray-300 focus:outline-none"
        placeholder="Título"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full flex-1 p-4 bg-transparent border-none resize-none focus:outline-none text-gray-700 overflow-y-auto"
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
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={() => onDeleteNote(note.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;

