import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Redex<span className="text-red-500">Crud</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-lg">
          <li>
            <Link to="/" className="hover:text-red-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-red-400 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/sign-in" 
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition duration-300"
            >
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
