import React from "react";
import helicopterscene from "../assets/3d/helicopter.glb";
import carscene from "../assets/3d/fallout_car_2.glb";
import { useGLTF } from "@react-three/drei";

const Helicopter = () => {
  const { scene, animations } = useGLTF(helicopterscene);
  return (
    <mesh scale={[0.01, -0.01, 0.01]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Helicopter;
