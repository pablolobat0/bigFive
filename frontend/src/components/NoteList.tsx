import React from "react";

interface Note {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface NoteListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onNewNote: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, selectedNote, onSelectNote, onNewNote }) => {
  // ✅ Función para obtener la fecha actual en formato DD/MM/YYYY
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("es-ES"); // Formato español (ejemplo: 22/02/2025)
  };

  return (
    <aside className="w-1/3 bg-sidebar p-4 flex flex-col">
      {/* Botón de Nueva Nota */}
      <button
        className="mb-4 bg-secondary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
        onClick={() => onNewNote()}
      >
        + Nueva Nota
      </button>

      {/* Contenedor con scroll solo cuando sea necesario */}
      <div className="flex-1 max-h-[65vh] overflow-y-auto">
        {notes.map((note) => (
          <button
            key={note.id}
            className={`block w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
              selectedNote && selectedNote.id === note.id
                ? "bg-third text-white" // ✅ Resalta solo la nota seleccionada
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => onSelectNote(note)}
          >
            <h3 className="font-bold truncate">{note.title}</h3>
            <p className="text-sm">{note.date || getCurrentDate()}</p> {/* ✅ Usa la fecha actual si no hay */}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default NoteList;
