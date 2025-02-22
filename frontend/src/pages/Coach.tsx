import Header from "../components/Header";
import GoalList from "../components/GoalList";
import Recommendations from "../components/Recommendations";
import Footer from "../components/Footer";

const Coach = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      
      {/* Contenedor que crece para mantener el footer en la parte inferior */}
      <div className="flex-1 flex items-center justify-center">
        <main className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <GoalList />
          <Recommendations />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Coach;
