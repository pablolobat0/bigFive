import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <>
      {/* Espaciador para evitar solapamientos */}
      <div className="h-20"></div>

      <header className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-md shadow-md z-50 h-16">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 h-full">
          
          {/* Menú de navegación centrado */}
          <nav className="flex-1 flex justify-center space-x-8 text-lg font-bold">
            <Link to="/inicio" className="text-headerText font-bold hover:text-third transition duration-300">Inicio</Link>
            <Link to="/chat" className="text-headerText font-bold hover:text-third transition duration-300">Chat</Link>
            <Link to="/diario" className="text-headerText font-bold hover:text-third transition duration-300">Diario</Link>
            <Link to="/perfil" className="text-headerText font-bold hover:text-third transition duration-300">Perfil</Link>
            <Link to="/coach" className="text-headerText font-bold hover:text-third transition duration-300">Coach</Link>
          </nav>

          {/* Icono de usuario */}
          <div className="flex items-center">
            <Link to="/login">
              <FaUserCircle className="text-4xl text-headerText hover:text-third cursor-pointer transition-transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
