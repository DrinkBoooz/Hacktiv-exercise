import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
      <h1 className="text-4xl font-bold text-gray-700 mb-8 hover:scale-110 transition-transform-gpu duration-200">
        Home Page
      </h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded transform hover:bg-blue-600 hover:scale-110 transition-transform-gpu duration-200">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 font-bold text-white bg-green-500 rounded transform hover:bg-green-600 hover:scale-110 transition-transform-gpu duration-200">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
