import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";
import computermodel from "../assets/3d/computer_and_laptop.glb";
const Computer = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) => {
  const { nodes, materials } = useGLTF(computermodel);
  const islandRef = useRef();
  const { gl, viewport } = useThree();

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
      <a.group
        position={[16.678, 8.418, 24.507]}
        rotation={[-Math.PI, -0.592, -Math.PI]}
        scale={[2.549, 0.243, 2.549]}
      >
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials["CHAIR-0"]}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials["WHEEL-0"]}
        />
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials["WHEEL-CAP-0"]}
        />
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials["WHEEL-NUT-0"]}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials["CHAIR-LEGS-0"]}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials["CHAIR-COVER-0"]}
        />
      </a.group>
      <a.group
        position={[-18.454, 15.918, 9.192]}
        rotation={[0, 0.926, -Math.PI]}
        scale={[-5.14, 0.147, 3.341]}
      >
        <mesh
          geometry={nodes.Object_31.geometry}
          material={materials["LAPTOP-0"]}
        />
        <mesh
          geometry={nodes.Object_32.geometry}
          material={materials["1KB-BASE-0"]}
        />
        <mesh
          geometry={nodes.Object_33.geometry}
          material={materials["1KEYS-0"]}
        />
        <mesh
          geometry={nodes.Object_34.geometry}
          material={materials["SCREEN-0.001"]}
        />
        <mesh
          geometry={nodes.Object_35.geometry}
          material={materials["SIGN-0"]}
        />
        <mesh
          geometry={nodes.Object_36.geometry}
          material={materials["TAG-0"]}
        />
      </a.group>
      <a.group
        position={[-2.333, 15.958, 2.159]}
        rotation={[0, 0.005, 0]}
        scale={[5.607, 0.175, 1.728]}
      >
        <mesh
          geometry={nodes.Object_38.geometry}
          material={materials["2KB-0"]}
        />
        <mesh
          geometry={nodes.Object_39.geometry}
          material={materials["1KB-BASE-0.001"]}
        />
        <mesh
          geometry={nodes.Object_40.geometry}
          material={materials["1KEYS-0.001"]}
        />
      </a.group>
      <mesh
        geometry={nodes.Object_11.geometry}
        material={materials["COMPUTER-0"]}
        position={[-18.152, 5.799, 9.513]}
        scale={[2.327, 5.804, 5.98]}
      />
      <mesh
        geometry={nodes.Object_13.geometry}
        material={materials["1COMPUTER-0"]}
        position={[-24.287, 5.799, 15.387]}
        scale={[2.327, 5.804, 5.98]}
      />
      <mesh
        geometry={nodes.Object_15.geometry}
        material={materials["DESK-0"]}
        position={[0, 15.452, 0]}
        scale={[29.541, 0.336, 8.492]}
      />
      <mesh
        geometry={nodes.Object_17.geometry}
        material={materials["MAT-0"]}
        position={[0, 0, 14.147]}
        scale={[46.718, 46.718, 26.649]}
      />
      <mesh
        geometry={nodes.Object_19.geometry}
        material={materials["SCREEN-0"]}
        position={[0, 21.761, -6.007]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[9.123, 4.323, 5.089]}
      />
      <mesh
        geometry={nodes.Object_21.geometry}
        material={materials["2PIC-0"]}
        position={[0, 21.761, -5.754]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[8.964, 4.204, 4.87]}
      />
      <mesh
        geometry={nodes.Object_23.geometry}
        material={materials["1PIC-0"]}
        position={[-16.887, 21.761, -0.693]}
        rotation={[Math.PI / 2, 0, -0.57]}
        scale={[8.964, 4.204, 4.87]}
      />
      <mesh
        geometry={nodes.Object_25.geometry}
        material={materials["3PIC-0"]}
        position={[16.987, 21.761, -0.811]}
        rotation={[Math.PI / 2, 0, 0.552]}
        scale={[8.964, 4.204, 4.87]}
      />
      <mesh
        geometry={nodes.Object_27.geometry}
        material={materials["BASS-0"]}
        position={[0, 4.992, 0.553]}
        scale={[5.47, 5, 3.905]}
      />
      <mesh
        geometry={nodes.Object_29.geometry}
        material={materials["SPEAKER-0"]}
        position={[-27.707, 18.537, 8.063]}
        rotation={[0, 0.588, 0]}
        scale={[1.076, 1.75, 0.848]}
      />
      <mesh
        geometry={nodes.Object_42.geometry}
        material={materials["MOUSE-0"]}
        position={[7.641, 16.001, 4.809]}
        rotation={[0, 0.415, 0]}
        scale={[0.751, 0.486, 1.161]}
      />
      <mesh
        geometry={nodes.Object_44.geometry}
        material={materials["MOUSEPAD-0"]}
        position={[7.625, 14.269, 3.664]}
        scale={3.11}
      />
    </a.group>
  );
};

export default Computer;
