import ProgressBar from "./ProgressBar";

// Definir la interfaz para las emociones
interface Emotions {
  neuroticism: number;
  extraversion: number;
  openness: number;
  agreeableness: number;
  conscientiousness: number;
}

// Definir las props del componente
interface GoalListProps {
  emotions: Emotions | null;
}

const GoalList = ({ emotions }: GoalListProps) => {
  // Definir los objetivos basados en las emociones
  const goals = [
    {
      id: 1,
      title: "Reducir el estrés",
      description: "Trabaja en reducir tu neuroticismo.",
      progress: emotions ? 100 - emotions.neuroticism : 0,
    },
    {
      id: 2,
      title: "Aumentar mi confianza",
      description: "Mejora tu extraversión para sentirte más seguro.",
      progress: emotions ? emotions.extraversion : 0,
    },
    {
      id: 3,
      title: "Perseverancia",
      description: "Desarrolla tu responsabilidad para ser más perseverante.",
      progress: emotions ? emotions.conscientiousness : 0,
    },
    {
      id: 4,
      title: "Amabilidad",
      description: "Trabaja en ser más amable con los demás.",
      progress: emotions ? emotions.agreeableness : 0,
    },
    {
      id: 5,
      title: "Apertura a nuevas experiencias",
      description: "Explora nuevas ideas y actividades.",
      progress: emotions ? emotions.openness : 0,
    },
  ];

  return (
    <section className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Objetivos Personalizados</h2>
      {goals.map((goal) => (
        <div key={goal.id} className="mb-4">
          <h3 className="text-lg font-semibold">
            {goal.id}. {goal.title}
          </h3>
          <p className="text-gray-600 text-sm">{goal.description}</p>
          <ProgressBar progress={goal.progress} />
        </div>
      ))}
    </section>
  );
};

export default GoalList;
