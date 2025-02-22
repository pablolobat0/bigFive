import React from "react";
import { motion } from "framer-motion"; // Importamos Framer Motion
import sonriendo from "../assets/sonriendo.png";
import relajandose from "../assets/relajandose.png";
import gorro from "../assets/gorro.png";
import meditando from "../assets/meditando.png";
import { Link } from "react-router-dom";

const Inicio: React.FC = () => {
  return (
    <section className="w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex items-center justify-center px-8 overflow-hidden bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100">
      <div className="container mx-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Texto a la izquierda con fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Un espacio seguro para escuchar, reflexionar y crecer.
            <br />
            Tu bienestar emocional es lo más importante.
          </h1>
          <p className="text-lg text-gray-600">
            Creemos en crear un espacio seguro y de apoyo para las personas que
            buscan sanación mental y emocional.
          </p>

          {/* Botón con fade-in + leve efecto de escala */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              filter: "drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.2))",
              rotate: [-1, 1, -1, 0], // Ligera oscilación al pasar el mouse
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/chat">
              <button className="bg-[#629D8C] text-white px-6 py-3 rounded-lg text-lg transition duration-300">
                Empieza a hablar
              </button>
            </Link>
          </motion.div>

        </motion.div>

        {/* Cuadrícula de imágenes SIN animación para mantener la elegancia */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src={sonriendo}
            alt="Persona sonriendo"
            className="rounded-xl object-cover w-full h-full bg-green-100"
          />
          <img
            src={relajandose}
            alt="Persona relajándose"
            className="rounded-xl object-cover w-full h-full bg-orange-100"
          />
          <img
            src={gorro}
            alt="Persona con gorro rojo"
            className="rounded-xl object-cover w-full h-full bg-yellow-100"
          />
          <img
            src={meditando}
            alt="Hombre meditando"
            className="rounded-xl object-cover w-full h-full bg-blue-100"
          />
        </div>
      </div>
    </section>
  );
};

export default Inicio;
