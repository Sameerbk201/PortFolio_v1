import React, { Suspense, useState } from "react";
import SkyModel2 from "../models/SkyModel2";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";

const Contact = () => {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section
      className={`w-full h-screen relative ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight />
          <SkyModel2 isRotating={isRotating} />
         
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Contact;
