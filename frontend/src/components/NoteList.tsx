import React from "react";

const NoteList = ({ notes, selectedNote, onSelectNote, onNewNote }: any) => {
  return (
    <aside className="w-1/3 bg-sidebar p-4 flex flex-col">
      {/* Botón de Nueva Nota */}
      <button
        className="mb-4 bg-secondary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
        onClick={onNewNote}
      >
        + Nueva Nota
      </button>

      {/* Contenedor con scroll solo cuando sea necesario */}
      <div className="flex-1 max-h-[65vh] overflow-y-auto">
        {notes.map((note: any) => (
          <button
            key={note.id}
            className={`block w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
              selectedNote.id === note.id ? "bg-third text-white" : "text-headerText hover:bg-gray-200"
            }`}
            onClick={() => onSelectNote(note)}
          >
            <h3 className="font-bold truncate">{note.title}</h3>
            <p className="text-sm">{note.date}</p>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default NoteList;
