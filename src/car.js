// Importing necessary React hooks and components
import React, { useEffect, useState } from "react";

// Importing the `useLoader` hook from React Three Fiber for loading 3D models
import { useLoader } from "@react-three/fiber";

// Importing the GLTFLoader to load GLTF/GLB model files
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Importing the Mesh class from Three.js for mesh-specific operations
import { Mesh } from "three";

// Defining the `Car` component with props for customization and interaction
export function Car({ carColor, modelUrl, setComponentNames, onComponentSelect }) {
  // Using `useLoader` to load a 3D car model (from a URL or default path)
  const gltf = useLoader(GLTFLoader, modelUrl || process.env.PUBLIC_URL + "models/car/car3.glb");

  // Using `useEffect` to process the model after it's loaded
  useEffect(() => {
    if (gltf) {
      // Log the loaded model for debugging purposes
      console.log("Model loaded:", gltf);

      // Set the scale and position of the loaded model's scene
      gltf.scene.scale.set(55, 55, 55); // Scales the model up uniformly
      gltf.scene.position.set(0, 0, 0); // Centers the model at the origin

      // Initialize an array to hold the names of individual components in the model
      const components = [];

      // Traverse through all objects in the model's scene
      gltf.scene.traverse((object) => {
        // Check if the object is a Mesh (geometry with material)
        if (object instanceof Mesh) {
          // Enable shadows for better visual quality
          object.castShadow = true;
          object.receiveShadow = true;

          // If the object has a name, add it to the components array
          if (object.name) {
            components.push(object.name);
          }

          // Store the object's name in its `userData` for easy reference
          object.userData = { name: object.name };
        }
      });

      // Pass the collected component names to the parent component via a callback
      setComponentNames(components);
    }
  }, [gltf, setComponentNames]); // Dependencies for the effect to re-run when `gltf` or `setComponentNames` changes

  // Function to handle clicks on parts of the model
  const handleClick = (event) => {
    // Check if there are any intersections (clicked objects)
    if (event.intersections.length > 0) {
      // Get the first intersected object (closest to the camera)
      const selectedObject = event.intersections[0].object;

      // Check if the selected object is a Mesh
      if (selectedObject instanceof Mesh) {
        // Pass the selected component to the parent via a callback
        onComponentSelect(selectedObject);
      }
    }
  };

  // Render the 3D model (as a primitive) and attach the click handler
  return (
    <primitive object={gltf.scene} onClick={handleClick} />
  );
}
