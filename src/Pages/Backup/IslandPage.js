import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import Loader from "../Components/Loader";
import Island from "../models/Island";
import SkyModel1 from "../models/SkyModel1";
import Bird from "../models/Bird";
import Plane from "../models/Plane";

const IslandPage = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  console.log({ currentStage });
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4]; //x y z axis
    }

    return [screenScale, screenPosition, rotation];
  };
  const adjustPlaneForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4]; //x y z axis
    }

    return [screenScale, screenPosition];
  };
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();
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
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor={"#000000"}
            intensity={1}
          />
          <Bird />
          <SkyModel1 isRotating={isRotating}/>
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
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

export default IslandPage;
