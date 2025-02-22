import React from "react";

const Inicio: React.FC = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Texto a la izquierda */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Un espacio seguro para escuchar, reflexionar y crecer.
            <br />
            Tu bienestar emocional es lo más importante.
          </h1>
          <p className="text-lg text-gray-600">
            Creemos en crear un espacio seguro y de apoyo para las personas que buscan sanación mental y emocional.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
            Empieza a hablar
          </button>
        </div>

        {/* Cuadrícula de imágenes */}
        <div className="grid grid-cols-2 gap-4">
          <img src="/img1.jpg" alt="Persona sonriendo" className="rounded-xl object-cover w-full h-full bg-green-100" />
          <img src="/img2.jpg" alt="Persona relajándose" className="rounded-xl object-cover w-full h-full bg-orange-100" />
          <img src="/img3.jpg" alt="Persona con gorro rojo" className="rounded-xl object-cover w-full h-full bg-yellow-100" />
          <img src="/img4.jpg" alt="Hombre meditando" className="rounded-xl object-cover w-full h-full bg-blue-100" />
        </div> 
        
      </div>
    </section>
  );
};

export default Inicio;
