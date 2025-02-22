import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-0 left-0 bg-white/30 backdrop-blur-md shadow-md py-4 z-50">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6">
        
        {/* Menú de navegación */}
        <nav className="flex-1 flex justify-center space-x-8 text-lg font-semibold">
          <Link to="/inicio" className="text-gray-800 hover:text-[#ffb4a2] transition duration-300">Inicio</Link>
          <Link to="/chat" className="text-gray-800 hover:text-[#ffb4a2] transition duration-300">Chat</Link>
          <Link to="/diario" className="text-gray-800 hover:text-[#ffb4a2] transition duration-300">Diario</Link>
          <Link to="/perfil" className="text-gray-800 hover:text-[#ffb4a2] transition duration-300">Perfil</Link>
          <Link to="/coach" className="text-gray-800 hover:text-[#ffb4a2] transition duration-300">Coach</Link>
        </nav>

        {/* Icono de usuario */}
        <div className="flex items-center">
          <Link to="/login">
            <FaUserCircle className="text-4xl text-gray-800 hover:text-[#ffb4a2] cursor-pointer transition-transform hover:scale-110" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
