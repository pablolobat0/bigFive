import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { motion } from "framer-motion";

const DiarioPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const apiUrl = "http://localhost:8000/diary"; // URL de la API

  interface Note {
    id: number;
    title: string;
    content: string;
  }

  /**
   * ✅ Carga las notas desde la API al iniciar la página.
   */
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("La API no devolvió un array:", data);
          return;
        }

        const formattedNotes = data.map((note: any) => ({
          id: Number(note.id) || Date.now(), // ✅ Asegura que el ID sea un número
          title: String(note.titulo) || "Sin título",
          content: String(note.entrada) || "",
        }));

        setNotes(formattedNotes);
        setSelectedNote(formattedNotes.length > 0 ? formattedNotes[0] : null);
      })
      .catch((error) => console.error("Error al obtener notas:", error));
  }, []);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  /**
   * ✅ Guardar la nota en la API y actualizar el estado
   */
  const handleUpdateNote = async (updatedNote: { id: number; title: string; content: string }) => {
    setIsSaving(true); // Indicar que se está guardando

    const diaryEntry = {
      user_id: "12345", // ⚠️ Cambia esto por el ID del usuario real
      titulo: updatedNote.title,
      entrada: updatedNote.content,
    };

    try {
      console.log("Guardando nota en la API...", diaryEntry);

      const response = await fetch(apiUrl, {
        method: "POST", // Cambia a "PUT" si necesitas actualizar en lugar de crear
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diaryEntry),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar la nota: ${response.statusText}`);
      }

      const savedNote = await response.json();
      console.log("Nota guardada con éxito:", savedNote);

      // ✅ Convertir ID a número
      const updatedNoteWithId: Note = {
        id: Number(updatedNote.id),
        title: updatedNote.title,
        content: updatedNote.content,
      };

      // ✅ Actualizar el estado local con la respuesta de la API
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNoteWithId.id ? updatedNoteWithId : note))
      );
      setSelectedNote(updatedNoteWithId);
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    } finally {
      setIsSaving(false); // Indicar que el guardado ha terminado
    }
  };

  const handleNewNote = () => {
    const newNote = {
      id: Date.now(), // Usamos Date.now() para evitar IDs duplicados
      title: "Nueva Nota",
      content: "",
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNote(newNote);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

    // ✅ Si no hay más notas, dejamos selectedNote en null
    setSelectedNote((prevSelected) =>
      prevSelected && prevSelected.id === noteId ? null : prevSelected
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
          {/* ✅ Solo renderiza el editor si hay una nota seleccionada */}
          {selectedNote && (
            <NoteEditor
              note={selectedNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
              isSaving={isSaving}
            />
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DiarioPage;
