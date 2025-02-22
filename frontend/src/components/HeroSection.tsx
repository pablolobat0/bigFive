import React from "react";
import sonriendo from "../assets/sonriendo.png";
import relajandose from "../assets/relajandose.png";
import gorro from "../assets/gorro.png";
import meditando from "../assets/meditando.png";
import { Link } from "react-router-dom";

const Inicio: React.FC = () => {
  return (
    <section className="w-full h-[calc(98vh-4rem)] max-h-[calc(98vh-4rem)] flex items-center justify-center px-8 overflow-hidden">
      <div className="container mx-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texto a la izquierda */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Un espacio seguro para escuchar, reflexionar y crecer.
            <br />
            Tu bienestar emocional es lo más importante.
          </h1>
          <p className="text-lg text-gray-600">
            Creemos en crear un espacio seguro y de apoyo para las personas que
            buscan sanación mental y emocional.
          </p>
          <Link to="/chat">
            <button className="bg-secondary text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
              Empieza a hablar
            </button>
          </Link>
        </div>

        {/* Cuadrícula de imágenes */}
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
