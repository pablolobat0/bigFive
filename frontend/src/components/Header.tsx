import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-transparent py-4">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6">
        
        {/* Menú de navegación */}
        <nav className="flex-1 flex justify-center space-x-12 text-lg font-bold font-poppins">
          <Link to="/inicio" className="text-headerText font-bold font-poppins hover:text-headerText/80 transition">Inicio</Link>
          <Link to="/chat" className="text-headerText font-bold font-poppins hover:text-headerText/80 transition">Chat</Link>
          <Link to="/diario" className="text-headerText font-bold font-poppins hover:text-headerText/80 transition">Diario</Link>
          <Link to="/perfil" className="text-headerText font-bold font-poppins hover:text-headerText/80 transition">Perfil</Link>
          <Link to="/coach" className="text-headerText font-bold font-poppins hover:text-headerText/80 transition">Coach</Link>
        </nav>

        {/* Icono de usuario */}
        <div className="flex items-center">
          <Link to="/login">
            <FaUserCircle className="text-4xl text-white bg-[#ffb4a2] rounded-full p-2 shadow-md cursor-pointer transition-transform hover:scale-110" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
