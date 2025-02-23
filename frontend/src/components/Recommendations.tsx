// Definir las props del componente
interface RecommendationsProps {
  advice: string | null;
}

const Recommendations = ({ advice }: RecommendationsProps) => {
  // Valores por defecto si advice es null
  const defaultAdvice = [
    "Ejercicios diarios: Escribe 3 cosas por las que estés agradecido hoy.",
    "Técnicas de mindfulness y relajación.",
    "Hábitos saludables: Desconectar el móvil antes de dormir.",
    "Sesiones de reflexión en el diario emocional.",
  ];

  // Usar los consejos de la API si están disponibles, de lo contrario, usar los valores por defecto
  const adviceList = advice
    ? advice.split("\n").filter((line) => line.trim())
    : defaultAdvice;

  return (
    <section className="bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">
        Plan de Acción y Recomendaciones Personalizadas
      </h2>
      <p className="text-gray-700 mb-2">
        Basado en su estado emocional y personalidad, el coach recomienda:
      </p>
      <ul className="list-disc list-inside text-gray-700">
        {adviceList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default Recommendations;
