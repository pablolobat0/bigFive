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

const data = {
  labels: [
    "Comunicación",
    "Puntualidad",
    "Resolución de problemas",
    "Cumplimiento de plazos",
    "Trabajo en equipo",
    "Conocimiento técnico",
  ],
  datasets: [
    {
      label: "Perfil de Usuario",
      data: [4, 3, 5, 3, 4, 5],
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
      angleLines: {
        display: true,
        color: "rgba(200, 200, 200, 0.3)", // Color de las líneas angulares
      },
      grid: {
        color: "rgba(200, 200, 200, 0.3)", // Color de la cuadrícula
      },
      pointLabels: {
        font: {
          size: 14, // Tamaño de las etiquetas
          weight: "bold" as const, // Grosor de las etiquetas
        },
        color: "#4a5568", // Color de las etiquetas
      },
      ticks: {
        display: false, // Oculta los números en los ejes
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
      titleFont: { size: 14 }, // Tamaño del título del tooltip
      bodyFont: { size: 12 }, // Tamaño del cuerpo del tooltip
    },
  },
};

const RadarChartComponent: React.FC = () => {
  return (
    <div className="w-full h-96 flex justify-center items-center">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChartComponent;
