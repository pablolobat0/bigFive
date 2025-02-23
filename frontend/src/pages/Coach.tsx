import { useEffect, useState } from "react";
import Header from "../components/Header";
import GoalList from "../components/GoalList";
import Recommendations from "../components/Recommendations";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = "12345"; // Reemplaza con el ID del usuario actual

        // Obtener las emociones del usuario
        const emotionsResponse = await fetch(`http://localhost:8000/bigfive?user_id=${user_id}`);
        if (!emotionsResponse.ok) {
          throw new Error("Error al obtener las emociones");
        }
        const emotionsData = await emotionsResponse.json();
        setEmotions(emotionsData);

        // Obtener los consejos del coach
        const adviceResponse = await fetch(`http://localhost:8000/coach?user_id=${user_id}`);
        if (!adviceResponse.ok) {
          if (adviceResponse.status === 400) {
            // Si el código de respuesta es 400, no actualizamos el estado de advice
            console.warn("La API devolvió un error 400. Usando valores por defecto.");
          } else {
            throw new Error("Error al obtener los consejos");
          }
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

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
    </motion.div>
  );
};

export default Coach;
