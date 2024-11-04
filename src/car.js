// import React, { useEffect } from "react";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Mesh } from "three";

// export function Car({ carColor, modelUrl }) {
//   const gltf = useLoader(GLTFLoader, modelUrl || process.env.PUBLIC_URL + "models/car/car3.glb");

//   useEffect(() => {
//     if (gltf) {
//       // Set up the scale and position of the model
//       gltf.scene.scale.set(55, 55, 55);
//       gltf.scene.position.set(0, 0, 0);

//       // Traverse the model to find specific meshes and apply color
//       gltf.scene.traverse((object) => {
//         if (object instanceof Mesh) {
//           object.castShadow = true;
//           object.receiveShadow = true;

//           // Change color only for the specific mesh (you can customize the mesh name if needed)
//           object.material.color.setRGB(carColor[0], carColor[1], carColor[2]);
//         }
//       });
//     }
//   }, [gltf, carColor]);

//   return gltf ? <primitive object={gltf.scene} /> : null;
// }


// Car.js
// import React, { useEffect, useState } from "react";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Mesh } from "three";

// export function Car({ carColor, modelUrl, setComponentNames }) {
//   const gltf = useLoader(GLTFLoader, modelUrl || process.env.PUBLIC_URL + "models/car/car3.glb");

//   useEffect(() => {
//     if (gltf) {
//       // Set up the scale and position of the model
//       console.log("Model loaded:", gltf);
//       gltf.scene.scale.set(55, 55, 55);
//       gltf.scene.position.set(0, 0, 0);

//       const components = [];

//       // Traverse the model to find specific meshes, apply color, and collect names
//       gltf.scene.traverse((object) => {
//         if (object instanceof Mesh) {
//           object.castShadow = true;
//           object.receiveShadow = true;

//           // Change color for specific mesh
//           object.material.color.setRGB(carColor[0], carColor[1], carColor[2]);

//           // Store component name if it exists
//           if (object.name) {
//             components.push(object.name);
//           }
//         }
//       });

//       // Pass component names to the parent component
//       setComponentNames(components);
//     }
//   }, [gltf, carColor, setComponentNames]);

//   return gltf ? <primitive object={gltf.scene} /> : null;

import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car({ carColor, modelUrl, setComponentNames, onComponentSelect }) {
  const gltf = useLoader(GLTFLoader, modelUrl || process.env.PUBLIC_URL + "models/car/car3.glb");

  useEffect(() => {
    if (gltf) {
      console.log("Model loaded:", gltf);

      gltf.scene.scale.set(55, 55, 55);
      gltf.scene.position.set(0, 0, 0);

      const components = [];

      // Traverse to find all meshes and store component names
      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          
          if (object.name) {
            components.push(object.name);
          }

          // Apply an event listener for selecting a component
          object.userData = { name: object.name }; // Store the name in userData for reference
        }
      });

      // Pass component names to the parent component
      setComponentNames(components);
    }
  }, [gltf, setComponentNames]);

  // Handle click on model parts
  const handleClick = (event) => {
    if (event.intersections.length > 0) {
      const selectedObject = event.intersections[0].object;
      if (selectedObject instanceof Mesh) {
        onComponentSelect(selectedObject); // Pass the selected component to parent
      }
    }
  };

  return (
    <primitive object={gltf.scene} onClick={handleClick} />
  );
}

