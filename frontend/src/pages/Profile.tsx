import { useEffect, useState } from 'react';
import Header from "../components/Header";
import RadarChart from "../components/RadarChart";
import LineChart from "../components/LineChart";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

// Definir la interfaz para las emociones
interface Emotions {
    neuroticism: number;
    extraversion: number;
    openness: number;
    agreeableness: number;
    conscientiousness: number;
}

const Profile = () => {
    const [emotions, setEmotions] = useState<Emotions | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmotions = async () => {
            // Verificar si el usuario está autenticado
            const token = localStorage.getItem("token");
            if (!token) {
                setShowAuthPopup(true); // Mostrar pop-up de autenticación
                return;
            }
            try {
                const response = await fetch("http://localhost:8000/bigfive", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener las emociones');
                }
                const data = await response.json();
                setEmotions(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Ocurrió un error desconocido");
                }
            }
        };

        fetchEmotions();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen w-full flex flex-col">
            <Header />

            {/* Contenedor flexible que mantiene el footer abajo */}
            <div className="flex-1 flex items-center justify-center">
                <main className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
                    {/* Sección del Radar Chart */}
                    <section className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-6">Visualización de la Personalidad</h2>
                        <div className="flex justify-center">
                            <RadarChart emotions={emotions} />
                        </div>
                        <p className="text-gray-600 mt-4">
                            Este gráfico representa tu perfil en diferentes áreas clave.
                        </p>
                    </section>

                    {/* Sección del Line Chart */}
                    <section className="text-center">
                        <h2 className="text-2xl font-bold mb-6">Análisis Emocional y Tendencias</h2>
                        <LineChart />
                        <p className="text-gray-600 mt-4">
                            Este gráfico muestra tus tendencias emocionales a lo largo del tiempo.
                        </p>
                    </section>
                </main>
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

export default Profile;
