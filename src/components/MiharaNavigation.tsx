import React from "react"
import { Link } from "react-router-dom"

const MiharaNavigation: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">Mihara College</div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/about" className="hover:text-blue-200">About</Link>
          <Link to="/contact" className="hover:text-blue-200">Contact</Link>
        </div>
      </nav>
    </div>
  );
}

export default MiharaNavigation;
