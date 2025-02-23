import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { motion } from "framer-motion";

interface Note {
  user_id: string;
  titulo: string;
  entrada: string;
}

const DiarioPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = "http://localhost:8000/diary"; // URL de la API

  /**
   * ✅ Carga las notas desde la API al iniciar la página.
   */
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: "12345"}),
      });
        if (!response.ok) {
          throw new Error(`Error al cargar las notas: ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("La API no devolvió un array de notas.");
        }
        setNotes(data);
      } catch (error) {
        console.error("Error al obtener notas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  /**
   * ✅ Guardar la nota en la API y actualizar el estado
   */
  const handleUpdateNote = async (updatedNote: Note) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al guardar la nota");
      }

      const savedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.user_id === updatedNote.user_id ? savedNote : note
        )
      );
      setSelectedNote(savedNote);
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewNote = () => {
    const newNote: Note = {
      user_id: "12345", // Cambia esto por el ID del usuario real
      titulo: "Nueva Nota",
      entrada: "",
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNote(newNote);
  };

  const handleDeleteNote = (user_id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.user_id !== user_id));
    setSelectedNote((prevSelected) =>
      prevSelected && prevSelected.user_id === user_id ? null : prevSelected
    );
  };

  return (
    <div className="bg-landing2Bg min-h-screen w-full flex flex-col">
      <Header />
      <div className="flex flex-1 bg-white shadow-lg rounded-lg overflow-hidden mt-10 mb-10 p-8 mx-10 max-w-6xl w-full self-center h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-1 bg-white shadow-lg rounded-lg overflow-hidden mt-10 mb-10 p-8 mx-10 max-w-6xl w-full self-center h-[80vh]"
        >
          <NoteList
            notes={notes}
            selectedNote={selectedNote}
            onSelectNote={handleSelectNote}
            onNewNote={handleNewNote}
          />
          {selectedNote && (
            <NoteEditor
              note={selectedNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
              isSaving={isSaving}
            />
          )}
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {isLoading && <div className="text-gray-500 mt-4">Cargando notas...</div>}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DiarioPage;
