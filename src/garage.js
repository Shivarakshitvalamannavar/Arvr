// Importing React library and the `useEffect` hook for managing side effects
import React, { useEffect } from "react";

// Importing `useLoader` from React Three Fiber to load 3D models
import { useLoader } from "@react-three/fiber";

// Importing the GLTFLoader to load GLTF/GLB model files
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Defining the `Garage` component to display a 3D garage model
export function Garage({ modelUrl }) {
  // Using `useLoader` to load a GLTF/GLB file. If no `modelUrl` is provided, it defaults to a garage model in the `public` directory.
  const gltf = useLoader(GLTFLoader, modelUrl || process.env.PUBLIC_URL + "models/garage/garage.glb");

  // Using `useEffect` to apply transformations to the model once it's loaded
  useEffect(() => {
    if (gltf) {
      // Log the loaded model for debugging purposes
      console.log("Garage model loaded:", gltf);

      // Set the scale of the garage model (maintains its original size)
      gltf.scene.scale.set(1, 1, 1);

      // Adjust the position of the garage model slightly above the ground
      gltf.scene.position.set(0, 0.5, 0);
    }
  }, [gltf]); // Re-run the effect when the `gltf` object changes

  // Render the 3D model (as a `primitive` object in React Three Fiber) if it is loaded
  return gltf ? <primitive object={gltf.scene} /> : null;
}
