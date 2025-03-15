import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-semibold text-xl text-gray-700">Tech Hire</h1>

        <p className="text-gray-600 text-sm mt-3 md:mt-0">
          © {new Date().getFullYear()} Tech Hire. All rights reserved. Since
          2025.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
