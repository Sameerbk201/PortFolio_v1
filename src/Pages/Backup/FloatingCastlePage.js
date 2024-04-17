import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import Loader from "../Components/Loader";
import CastleInTheSky from "../models/CastleInTheSky";
import SkyModel1 from "../models/SkyModel1";
import SkyModel2 from "../models/SkyModel2";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import Helicopter from "../models/Helicopter";
import Car from "../models/Car";
import FloatingCastle from "../models/FloatingCastle";

const FloatingCastlePage = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  console.log({ currentStage });
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [0.1, 4.7, 0.0];

    if (window.innerWidth < 768) {
      screenScale = [3.7, 3.7, 3.7];
      screenPosition = [0, -0.5, 0]; //x y z
    } else {
      screenScale = [7, 7, 7];
      screenPosition = [0, -0.5, 0]; //x y z
    }

    return [screenScale, screenPosition, rotation];
  };
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const adjustPlaneForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;

    if (window.innerWidth < 768) {
      screenScale = [0.001, 0.001, 0.001];
      screenPosition = [0, -0.3, 2.5]; //x y z axis
    } else {
      screenScale = [0.001, 0.001, 0.001];
      screenPosition = [0, -0.3, 3.0]; //x y z axis
    }

    return [screenScale, screenPosition];
  };
  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  return (
    <section
      className={`w-full h-screen relative ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="text-[#70d8bd] absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
       
      </div>
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
          <Bird />
          <FloatingCastle
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Car
            planeScale={planeScale}
            planePosition={planePosition}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default FloatingCastlePage;
