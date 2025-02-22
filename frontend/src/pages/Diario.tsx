import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { motion } from "framer-motion";

const DiarioPage: React.FC = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Nueva Nota", date: "22/02/2025", content: "Hola, hoy me encuentro un poco mal" },
    { id: 2, title: "Tristeza", date: "20/02/2025", content: "Hoy tuve un día difícil..." },
    { id: 3, title: "Hoy Bien", date: "17/02/2025", content: "Me sentí feliz porque..." },
    { id: 4, title: "Me habló", date: "11/02/2025", content: "Recibí un mensaje inesperado" },
    { id: 5, title: "Un poco raro", date: "05/02/2025", content: "Sentí algo diferente hoy" },
  ]);

  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [isSaving, setIsSaving] = useState(false); // Estado para manejar el guardado

  const handleSelectNote = (note: any) => {
    setSelectedNote(note);
  };

  const handleUpdateNote = async (updatedNote: any) => {
    setIsSaving(true); // Indicar que se está guardando

    // Simulación de una llamada a una API REST
    try {
      console.log("Guardando nota en la API...", updatedNote);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular un retraso de 1 segundo

      // Actualizar el estado local de las notas
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
      setSelectedNote(updatedNote);
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    } finally {
      setIsSaving(false); // Indicar que el guardado ha terminado
    }
  };

  const handleNewNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: "Nueva Nota",
      date: new Date().toLocaleDateString(),
      content: "",
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

    // Si la nota eliminada es la actual, seleccionamos otra o dejamos vacío
    if (selectedNote.id === noteId) {
      setSelectedNote(notes.length > 1 ? notes[0] : { id: 0, title: "", date: "", content: "" });
    }
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
          <NoteEditor
            note={selectedNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
            isSaving={isSaving}
          />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DiarioPage;
