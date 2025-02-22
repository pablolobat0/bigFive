import React from "react";
import { motion } from "framer-motion"; // Importamos Framer Motion
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <>
      {/* Espaciador para evitar solapamientos */}
      <div className="h-20"></div>

      {/* Animación de fade-in + desplazamiento al cargar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-md shadow-md z-50 h-16"
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 h-full">
          
          {/* Texto como icono a la izquierda con animación de hover */}
          <motion.div
            whileHover={{ scale: 1.1, opacity: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/inicio" className="text-2xl font-extrabold text-headerText hover:text-third transition duration-300">
              My App
            </Link>
          </motion.div>

          {/* Menú de navegación centrado */}
          <nav className="flex-1 flex justify-center space-x-8 text-lg font-bold">
            {["chat", "diario", "perfil", "coach"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Link to={`/${item}`} className="text-headerText font-bold hover:text-third transition duration-300">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
                {/* Subrayado animado */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-third scale-x-0"
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </nav>

          {/* Icono de usuario con efecto de rebote */}
          <motion.div
            whileHover={{ scale: 1.2, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/login">
              <FaUserCircle className="text-4xl text-headerText hover:text-third cursor-pointer transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
