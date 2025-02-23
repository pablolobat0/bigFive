import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

// Función para obtener el color según el progreso
const getProgressColor = (progress: number) => {
  if (progress < 25) return "#4ade80"; // Verde (bg-green-400)
  if (progress < 50) return "#facc15"; // Amarillo (bg-yellow-400)
  if (progress < 75) return "#fb923c"; // Naranja (bg-orange-400)
  if (progress < 95) return "#f87171"; // Rojo (bg-red-400)
  return "#dc2626"; // Rojo oscuro (bg-red-600) para 95-100%
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%`, backgroundColor: getProgressColor(progress) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full"
      ></motion.div>
      <span className="absolute right-0 top-0 text-xs text-gray-600">
        {progress}% completed
      </span>
    </div>
  );
};

export default ProgressBar;
