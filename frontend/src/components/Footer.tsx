import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-secondary py-8 px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Redes sociales */}
        <div className="flex space-x-6 text-white text-2xl">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                <FaLinkedin />
            </a>
        </div>

        {/* Texto a la derecha */}
        <p className="text-white text-lg text-center md:text-right mt-6 md:mt-0">
          Descubre quién eres. Mejora tu bienestar con herramientas basadas en ciencia y tecnología.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
