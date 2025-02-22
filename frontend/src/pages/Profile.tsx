import Header from "../components/Header";
import RadarChart from "../components/RadarChart";
import LineChart from "../components/LineChart";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      {/* Contenedor flexible que mantiene el footer abajo */}
      <div className="flex-1 flex items-center justify-center">
        <main className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
          {/* Sección del Radar Chart */}
          <section className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6">Visualización de la Personalidad</h2>
            <div className="flex justify-center">
              <RadarChart />
            </div>
            <p className="text-gray-600 mt-4">
              Este gráfico representa tu perfil en diferentes áreas clave.
            </p>
          </section>

          {/* Sección del Line Chart */}
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-6">Análisis Emocional y Tendencias</h2>
            <LineChart />
            <p className="text-gray-600 mt-4">
              Este gráfico muestra tus tendencias emocionales a lo largo del tiempo.
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
