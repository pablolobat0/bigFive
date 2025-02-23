import { motion, AnimatePresence } from "framer-motion";

interface Note {
  user_id: string;
  titulo: string;
  entrada: string;
}

interface NoteListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onNewNote: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, selectedNote, onSelectNote, onNewNote }) => {
  return (
    <aside className="w-1/3 bg-sidebar p-4 flex flex-col">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-4 bg-secondary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
        onClick={onNewNote}
      >
        + Nueva Nota
      </motion.button>

      <motion.div className="flex-1 max-h-[65vh] overflow-y-auto">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.button
              key={note.user_id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`block w-full text-left px-4 py-3 rounded-lg mb-2 transition-all ${
                selectedNote && selectedNote.user_id === note.user_id
                  ? "bg-third text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={() => onSelectNote(note)}
            >
              <h3 className="font-bold truncate">{note.titulo}</h3>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </aside>
  );
};

export default NoteList;
