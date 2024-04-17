import React, { useEffect, useRef } from "react";
import carscene from "../assets/3d/fallout_car_2.glb";
import { useAnimations, useGLTF } from "@react-three/drei";


const Car = ({ isRotating, ...props }) => {
  const { scene, animations } = useGLTF(carscene);
  const ref = useRef();
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, ref);
  return (
    <mesh
      scale={props.planeScale}
      position={props.planePosition}
      rotation={props.rotation}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default Car;
