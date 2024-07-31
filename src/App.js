import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Splash from "./pages/Splash";

const App = () => {
  useEffect(() => {
    document.title = "Fakebook";
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/splash" element={<Splash />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
