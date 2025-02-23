import { useEffect, useState } from 'react';
import Header from "../components/Header";
import RadarChart from "../components/RadarChart";
import LineChart from "../components/LineChart";
import Footer from "../components/Footer";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const user_id = "12345"; // Reemplaza con el ID del usuario actual
        const response = await fetch(`http://localhost:8000/bigfive?user_id=${user_id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las emociones');
        }
        const data = await response.json();
        setEmotions(data);
      } catch (error) {
        // Verificar si el error es una instancia de Error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmotions();
  }, []);

  if (loading) return <div>Cargando...</div>;
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
    </div>
  );
};

export default Profile;
