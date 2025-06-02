import React from "react";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white shadow-lg py-4 px-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Historical Weather Dashboard
        </h1>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <a
            href="#home"
            className="text-sm sm:text-base font-medium hover:text-blue-200 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-sm sm:text-base font-medium hover:text-blue-200 transition-colors duration-200"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
