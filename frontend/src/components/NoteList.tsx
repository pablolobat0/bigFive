import React from "react";

const NoteList = ({ notes, selectedNote, onSelectNote, onNewNote }: any) => {
  return (
    <aside className="w-1/3 bg-sidebar p-4 flex flex-col">
      <button
        className="mb-4 bg-secondary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
        onClick={onNewNote}
      >
        + Nueva Nota
      </button>
      {notes.map((note: any) => (
        <button
          key={note.id}
          className={`block w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
            selectedNote.id === note.id ? "bg-third text-white" : "text-headerText hover:bg-gray-200"
          }`}
          onClick={() => onSelectNote(note)}
        >
          <h3 className="font-bold">{note.title}</h3>
          <p className="text-sm">{note.date}</p>
        </button>
      ))}
    </aside>
  );
};

export default NoteList;
