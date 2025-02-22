import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const App: React.FC = () => {
  return (
    <div className="bg-white min-h-screen w-full max-w-full overflow-x-hidden flex flex-col items-center">
      <Header />

      <Footer />
    </div>
  );
};

export default App;
