import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import skyScene from "../assets/3d/night_sky_visible_spectrum_monochromatic.glb";
import { useFrame } from "@react-three/fiber";
const SkyModel2 = ({ isRotating }) => {
  const sky = useGLTF(skyScene);
  const skyref = useRef();
  useFrame((_, delta) => {
    if (isRotating) skyref.current.rotation.y += 0.25 * delta;
  });
  return (
    <mesh ref={skyref}>
      <primitive object={sky.scene} />
    </mesh>
  );
};

export default SkyModel2;
