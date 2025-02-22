import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

// 🔹 Registrar los componentes necesarios de Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: ["Comunicación", "Puntualidad", "Resolución de problemas", "Cumplimiento de plazos", "Trabajo en equipo", "Conocimiento técnico"],
  datasets: [
    {
      label: "Perfil de Usuario",
      data: [4, 3, 5, 3, 4, 5],
      backgroundColor: "rgba(136, 132, 216, 0.6)",
      borderColor: "#8884d8",
      borderWidth: 2,
    },
  ],
};

const RadarChartComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
      <Radar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default RadarChartComponent;
