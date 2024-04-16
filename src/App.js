import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import About from "./Pages/About";

import Contact from "./Pages/Contact";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/island" element={<HomeIsLand />} /> */}
        {/* <Route path="/floatingcastle" element={<FloatingCastlePage />} /> */}
        <Route path="/contact" element={<Contact />} />
        {/* Redirect any other route to the home page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
