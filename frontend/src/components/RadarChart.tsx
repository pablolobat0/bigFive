import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Definir la interfaz para las emociones
interface Emotions {
  neuroticism: number;
  extraversion: number;
  openness: number;
  agreeableness: number;
  conscientiousness: number;
}

// Definir las props del componente
interface RadarChartProps {
  emotions: Emotions | null;
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ emotions }) => {
  const data = {
    labels: [
      "Neuroticismo",
      "Extraversión",
      "Apertura",
      "Amabilidad",
      "Responsabilidad",
    ],
    datasets: [
      {
        label: "Perfil de Usuario",
        data: emotions ? [
          emotions.neuroticism,
          emotions.extraversion,
          emotions.openness,
          emotions.agreeableness,
          emotions.conscientiousness,
        ] : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(136, 132, 216, 0.4)", // Color de fondo más suave
        borderColor: "#8884d8", // Color del borde
        borderWidth: 2, // Grosor del borde
        pointBackgroundColor: "#8884d8", // Color de los puntos
        pointBorderColor: "#fff", // Borde de los puntos
        pointHoverBackgroundColor: "#fff", // Color de los puntos al pasar el mouse
        pointHoverBorderColor: "#8884d8", // Borde de los puntos al pasar el mouse
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite ajustar el tamaño manualmente
    scales: {
      r: {
        type: "radialLinear" as const, // Especificar el tipo correctamente
        angleLines: {
          display: true,
          color: "rgba(200, 200, 200, 0.3)", // Color de las líneas angulares
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Color de la cuadrícula
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 700, // 🔥 Se cambia de "bold" a 700 (valor numérico válido)
          },
          color: "#4a5568",
        },
        ticks: {
          display: false,
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Oculta la leyenda
      },
      tooltip: {
        enabled: true, // Habilita los tooltips
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Fondo del tooltip
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
  };

  return (
    <div className="w-full h-96 flex justify-center items-center">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChartComponent;
