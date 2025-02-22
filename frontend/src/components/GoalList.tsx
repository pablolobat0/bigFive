import ProgressBar from "./ProgressBar";

interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
}

const goals: Goal[] = [
  { id: 1, title: "Reducir el estrés", description: "Descripción del carallo este", progress: 76 },
  { id: 2, title: "Aumentar mi confianza", description: "Descripción del carallo este", progress: 100 },
  { id: 3, title: "Perseverancia", description: "Descripción del carallo este", progress: 30 },
  { id: 4, title: "Gott mins uns", description: "Descripción del carallo este", progress: 14 },
  { id: 5, title: "Dios con nosotros", description: "Descripción del carallo este", progress: 56 },
];

const GoalList = () => {
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
