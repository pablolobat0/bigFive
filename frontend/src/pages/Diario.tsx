import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const navigate = useNavigate();
    /**
     * ✅ Carga las notas desde la API al iniciar la página.
     */
    useEffect(() => {
        const fetchNotes = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setShowAuthPopup(true); // Mostrar pop-up de autenticación
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
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
     * Guardar la nota en la API y actualizar el estado
     */
    const handleUpdateNote = async (updatedNote: Note) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setShowAuthPopup(true); // Mostrar pop-up de autenticación
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
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
            {/* Pop-up de autenticación */}
            {showAuthPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Debes estar registrado</h2>
                        <p className="mb-4">Para usar esta función, inicia sesión o regístrate.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Registrarse
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiarioPage;
