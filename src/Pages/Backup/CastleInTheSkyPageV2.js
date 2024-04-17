import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import Loader from "../Components/Loader";
import SkyModel2 from "../models/SkyModel2";
import Bird from "../models/Bird";
import Car from "../models/Car";
import HomeInfo from "../Components/HomeInfo";
import CastleInTheSkyV2 from "../models/CastleInTheSkyV2";

const CastleInTheSkyPageV2 = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  console.log({ currentStage });
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [0.1, 7, 0.0];

    if (window.innerWidth < 768) {
       screenScale = [0.2, 0.2, 0.2];
      screenPosition = [0, -0.5, 0]; //x y z
    } else {
      screenScale = [0.2, 0.2, 0.2];
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
      screenPosition = [0, -0.3, 3.5]; //x y z axis
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
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
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
          <SkyModel2 isRotating={isRotating} />
          <CastleInTheSkyV2
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

export default CastleInTheSkyPageV2;
