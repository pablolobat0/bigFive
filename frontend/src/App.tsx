import React, { useState } from "react";
import Header from "./components/Header.tsx";
import HeroSection from "./components/HeroSection.tsx";
import QueOfrecemos from "./components/QueOfrecemos.tsx";
import Pasos from "./components/Pasos.tsx";
import Footer from "./components/Footer.tsx";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <HeroSection />
      <QueOfrecemos />
      <Pasos />
      <Footer />
    </div>
  );
};

export default App;
