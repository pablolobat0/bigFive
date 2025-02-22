import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import QueOfrecemos from "./components/QueOfrecemos";
import Pasos from "./components/Pasos";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="bg-white min-h-screen w-full max-w-full overflow-x-hidden flex flex-col items-center">
      <Header />
      <HeroSection />
      <QueOfrecemos />
      <Pasos />
      <Footer />
    </div>
  );
};

export default App;
