import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/useAuth";

export const Navbar: React.FC = () => {
  const { currentUser, logOut } = useAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      // You might want to navigate the user to the login page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

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
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <span className="text-xs text-muted hidden sm:inline">{currentUser.email}</span>
              <button onClick={handleLogout} className="text-sm text-muted hover:underline">Sign out</button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-muted">Sign in</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
