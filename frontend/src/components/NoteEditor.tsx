import { useState, useEffect } from "react";

interface Note {
  user_id: string;
  titulo: string;
  entrada: string;
}

interface NoteEditorProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (user_id: string) => void;
  isSaving: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdateNote, onDeleteNote, isSaving }) => {
  const [titulo, setTitulo] = useState(note.titulo);
  const [entrada, setEntrada] = useState(note.entrada);
  const [error, setError] = useState<string | null>(null);

  // Actualizar el estado interno cuando cambia la nota seleccionada
  useEffect(() => {
    setTitulo(note.titulo);
    setEntrada(note.entrada);
  }, [note]);

  const handleSave = async () => {
    if (!note) return; // Evita errores si note es null

    const updatedNote: Note = {
      user_id: note.user_id,
      titulo: titulo,
      entrada: entrada,
    };

    try {
      setError(null);
      onUpdateNote(updatedNote); // Llama la función para actualizar el estado en el frontend
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      setError("Error al guardar la nota. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="flex-1 flex flex-col ml-8">
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="text-2xl font-bold mb-4 p-2 border-b border-gray-300 focus:outline-none"
        placeholder="Título"
      />
      <textarea
        value={entrada}
        onChange={(e) => setEntrada(e.target.value)}
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
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={() => onDeleteNote(note.user_id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
