import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import Chat from "./pages/Chat.tsx";

const App: React.FC = () => {
  return (
    <div className="bg-white min-h-screen w-full max-w-full overflow-x-hidden flex flex-col items-center">
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" />} />
      <Route path="/inicio" element={<LandingPage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </div>
  );
};

export default App;
