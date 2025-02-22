import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-red-400"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute right-0 top-0 text-xs text-gray-600">
        {progress}% completed
      </span>
    </div>
  );
};

export default ProgressBar;
