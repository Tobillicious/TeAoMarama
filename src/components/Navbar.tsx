import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-transparent px-6 py-4">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold" style={{letterSpacing: '.06em'}}>Te Ao Mārama</div>
          <div className="hidden md:flex gap-4 text-sm text-muted">
            <Link to="/">Home</Link>
            <Link to="/styleguide">Style Guide</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="text-sm text-muted">Sign in</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
