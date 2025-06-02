import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherDashboard from "./pages/WeatherDashboard";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <WeatherDashboard />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
