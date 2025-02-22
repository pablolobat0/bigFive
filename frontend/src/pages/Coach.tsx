import Header from "../components/Header";
import GoalList from "../components/GoalList";
import Recommendations from "../components/Recommendations";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Coach = () => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen w-full flex flex-col"
    >
      <Header />
      
      {/* Contenedor que crece para mantener el footer en la parte inferior */}
      <div className="flex-1 flex items-center justify-center">
        <motion.main 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.4 }}
            className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg"
            >
            <GoalList />
            <Recommendations />
        </motion.main>
      </div>

      <Footer />
      </motion.div>
  );
};

export default Coach;
