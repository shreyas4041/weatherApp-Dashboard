import React from "react";

function Footer() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-8">
      <div className="container mx-auto">
        <p>
          © {currentYear} Historical Weather Dashboard. Data provided by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Open-Meteo.com
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
