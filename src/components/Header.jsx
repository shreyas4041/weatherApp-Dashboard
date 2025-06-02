import React from "react";

function Header() {
  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-md py-4 px-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center">
          Historical Weather Dashboard
        </h1>
      </div>
    </header>
  );
}

export default Header;
