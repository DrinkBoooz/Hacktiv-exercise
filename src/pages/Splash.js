import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";

const Splash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logoutUser()); // Clear user data
    navigate("/"); // Redirect to Home page
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-300">
        <h1 className="text-4xl font-bold text-gray-700">No user data found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-300 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-700">
        Welcome, {user.name}!
      </h1>
      <div className="bg-slate-200 text-gray-700 p-4 rounded-lg shadow-lg w-full max-w-md">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Mobile Number:</strong> {user.mobileNumber}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Password (Encrypted):</strong> {user.password}
        </p>
        <p>
          <strong>Password (Uncrypted):</strong> {user.unencryptedPassword}
        </p>
        <p>
          <strong>Birthdate:</strong> {user.birthdate}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 py-2 px-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 hover:scale-110 transition-transform duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Splash;
