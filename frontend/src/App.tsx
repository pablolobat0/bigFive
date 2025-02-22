import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import Chat from "./pages/Chat.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-white min-h-screen w-full max-w-full overflow-x-hidden flex flex-col items-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
