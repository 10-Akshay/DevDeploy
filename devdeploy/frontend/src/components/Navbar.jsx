import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    
    <nav className="bg-gray-950 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
         {/* Logo */}
      <div className="flex items-center gap-3">
        <FaRocket className="text-cyan-400 text-3xl" />

        <div>
          <h1 className="text-2xl font-bold text-white">
            DevDeploy
          </h1>

          <p className="text-xs text-gray-400">
            DevOps Deployment Platform
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 text-white">
          <FaUserCircle className="text-3xl text-gray-400" />

          <div>
            <p className="font-semibold">
              Admin
            </p>

            <p className="text-xs text-gray-400">
              DevOps Engineer
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl text-white font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;