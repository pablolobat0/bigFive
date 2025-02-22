/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Asegura que Tailwind escanee los archivos correctos
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF", // Esto equivale a "text-white"
        secondary: "#629D8C", // Verde
        third: "#FFB4A2", // Blanco
        headerText: "#394149",
        landing2Bg: "#F9FBFB",
        sidebar: "#F5F5F5", // Fondo del sidebar
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Agregar la fuente Poppins
      },
    },
  },
  plugins: [],
};
