import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";
import fire_in_the_sky from "../assets/3d/fire_in_the_sky.glb";

const CastleInTheSky = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) => {
  const islandRef = useRef();
  const { gl, viewport } = useThree();

  const { nodes, materials } = useGLTF(fire_in_the_sky);
  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });
  return (
    <a.group {...props} ref={islandRef}>
      <a.group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_15.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_18.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_21.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_22.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_23.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_24.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_25.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_26.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_27.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_28.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_29.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_30.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_31.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_32.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_33.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_34.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_35.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_36.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_37.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_38.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_39.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_40.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_41.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_42.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_43.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_44.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_45.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_46.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_47.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_48.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_49.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_50.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_51.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_52.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_53.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_54.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_55.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_56.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_57.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_58.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_59.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_60.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_61.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_62.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_63.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_64.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_65.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_66.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_67.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_68.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_69.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_70.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_71.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_72.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_73.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_74.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_75.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_76.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_77.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_78.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_79.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_80.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_81.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_82.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_83.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_84.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_85.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_86.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_87.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_88.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_89.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_90.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_91.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_92.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_93.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_94.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_95.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_96.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_97.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_98.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_99.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_100.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_101.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_102.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_103.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_104.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_105.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_106.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_107.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_108.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_109.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_110.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_111.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_112.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_113.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_114.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_115.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_116.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_117.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_118.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_119.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_120.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_121.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_122.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_123.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_124.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_125.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_126.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_127.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_128.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_129.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_130.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_131.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_132.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_133.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_134.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_135.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_136.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_137.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_138.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_139.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_140.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_141.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_142.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_143.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_144.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_145.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_146.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_147.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_148.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_149.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_150.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_151.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_152.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_153.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_154.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_155.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_156.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_157.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_158.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_159.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_160.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_161.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_162.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_163.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_164.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_165.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_166.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_167.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_168.geometry}
          material={materials.FeatherMaterial}
        />
        <mesh
          geometry={nodes.Object_169.geometry}
          material={materials.FeatherMaterial}
        />
      </a.group>
      <a.group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_171.geometry}
          material={materials["Material.212"]}
        />
        <mesh
          geometry={nodes.Object_172.geometry}
          material={materials["Material.226"]}
        />
        <mesh
          geometry={nodes.Object_173.geometry}
          material={materials["Material.227"]}
        />
        <mesh
          geometry={nodes.Object_174.geometry}
          material={materials["Material.330"]}
        />
        <mesh
          geometry={nodes.Object_175.geometry}
          material={materials["Material.334"]}
        />
        <mesh
          geometry={nodes.Object_176.geometry}
          material={materials["Material.335"]}
        />
        <mesh
          geometry={nodes.Object_177.geometry}
          material={materials["Material.336"]}
        />
        <mesh
          geometry={nodes.Object_178.geometry}
          material={materials["Material.282"]}
        />
        <mesh
          geometry={nodes.Object_179.geometry}
          material={materials["Material.283"]}
        />
        <mesh
          geometry={nodes.Object_180.geometry}
          material={materials["Material.102"]}
        />
        <mesh
          geometry={nodes.Object_181.geometry}
          material={materials["Material.102"]}
        />
        <mesh
          geometry={nodes.Object_182.geometry}
          material={materials["Material.102"]}
        />
        <mesh
          geometry={nodes.Object_183.geometry}
          material={materials["Material.102"]}
        />
        <mesh
          geometry={nodes.Object_184.geometry}
          material={materials["Material.104"]}
        />
        <mesh
          geometry={nodes.Object_185.geometry}
          material={materials["Material.105"]}
        />
      </a.group>
    </a.group>
  );
};

export default CastleInTheSky;
