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
        <main className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          {/* Sección del Radar Chart */}
          <section className="text-center mb-8">
            <h2 className="text-xl font-bold mb-4">Visualización de la Personalidad</h2>
            <RadarChart />
            <p className="text-gray-600 mt-2">Insertar explicación del gráfico</p>
          </section>

          {/* Sección del Line Chart */}
          <section className="text-center">
            <h2 className="text-xl font-bold mb-4">Análisis Emocional y Tendencias</h2>
            <LineChart />
            <p className="text-gray-600 mt-2">Insertar explicación del gráfico</p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
