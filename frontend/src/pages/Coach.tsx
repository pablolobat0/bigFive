import { useEffect, useState } from "react";
import Header from "../components/Header";
import GoalList from "../components/GoalList";
import Recommendations from "../components/Recommendations";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Definir la interfaz para las emociones
interface Emotions {
    neuroticism: number;
    extraversion: number;
    openness: number;
    agreeableness: number;
    conscientiousness: number;
}

// Definir la interfaz para los consejos
interface Advice {
    advice: string;
}

const Coach = () => {
    const [emotions, setEmotions] = useState<Emotions | null>(null);
    const [advice, setAdvice] = useState<string | null>(null);
    const [_, setError] = useState<string | null>(null);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [showAnalysisPopup, setShowAnalysisPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            // Verificar si el usuario está autenticado
            const token = localStorage.getItem("token");
            if (!token) {
                setShowAuthPopup(true); // Mostrar pop-up de autenticación
                return;
            }

            try {
                // Obtener las emociones del usuario
                const emotionsResponse = await fetch("http://localhost:8000/bigfive", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!emotionsResponse.ok) {
                    setShowAnalysisPopup(true); // Mostrar pop-up de análisis
                    return;
                }
                const emotionsData = await emotionsResponse.json();
                setEmotions(emotionsData);

                // Obtener los consejos del coach
                const adviceResponse = await fetch("http://localhost:8000/coach", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!adviceResponse.ok) {
                    throw new Error("Error al obtener los consejos");
                } else {
                    const adviceData: Advice = await adviceResponse.json();
                    setAdvice(adviceData.advice);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Ocurrió un error desconocido");
                }
            }
        };

        fetchData();
    }, []);


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen w-full flex flex-col"
        >
            <Header />

            {/* Contenedor que crece para mantener el footer en la parte inferior */}
            <div className="flex-1 flex items-center justify-center">
                <motion.main
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg"
                >
                    <GoalList emotions={emotions} />
                    <Recommendations advice={advice} />
                </motion.main>
            </div>

            <Footer />
            {/* Pop-up de autenticación */}
            {
                showAuthPopup && (
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
                )
            }
            {/* Nuevo pop-up de análisis requerido */}
            {showAnalysisPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">📝 Necesitamos conocerte mejor</h2>
                        <p className="mb-4 max-w-md">
                            Para darte recomendaciones personalizadas, necesitamos:
                        </p>
                        <ul className="list-disc pl-5 mb-6 text-left inline-block">
                            <li>Que hables con el chatbot</li>
                            <li>Que añadas entradas al diario</li>
                        </ul>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate("/chat")}
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                            >
                                Comenzar conversación
                            </button>
                            <button
                                onClick={() => navigate("/diario")}
                                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                            >
                                Escribir en el diario
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Coach;
