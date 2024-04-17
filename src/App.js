import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Lazy load the components
const Navbar = lazy(() => import("./Components/Navbar"));
const Home = lazy(() => import("./Pages/Home"));
const Projects = lazy(() => import("./Pages/Projects"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Footer = lazy(() => import("./Components/Footer"));

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
};

export default App;
