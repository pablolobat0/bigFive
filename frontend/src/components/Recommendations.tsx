const Recommendations = () => {
  return (
    <section className="bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">
        Plan de Acción y Recomendaciones Personalizadas
      </h2>
      <p className="text-gray-700 mb-2">
        Basado en su estado emocional y personalidad, el coach recomienda:
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          <strong>Ejercicios diarios:</strong> Escribe 3 cosas por las que estés
          agradecido hoy.
        </li>
        <li>Técnicas de mindfulness y relajación.</li>
        <li>
          <strong>Hábitos saludables:</strong> Desconectar el móvil antes de
          dormir.
        </li>
        <li>Sesiones de reflexión en el diario emocional.</li>
      </ul>
    </section>
  );
};

export default Recommendations;
