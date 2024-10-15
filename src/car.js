
// import React, { useEffect } from "react";
// import { useLoader } from "@react-three/fiber";
// import { Mesh } from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export function Car({ carColor }) {
//   const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/car/car3.glb");

//   useEffect(() => {
//     // Set up the scale and position of the model
//     gltf.scene.scale.set(55, 55, 55);
//     //gltf.scene.scale.set(0.0005,0.0005,0.0005);
//     gltf.scene.position.set(0, 0, 0);

//     // Traverse the model to find the specific mesh by name
//     gltf.scene.traverse((object) => {
//       if (object instanceof Mesh) {
//         object.castShadow = true;
//         object.receiveShadow = true;

//         // Change color only for the mesh named "Object-24"
        
//         object.material.color.setRGB(carColor[0], carColor[1], carColor[2]);
        
//       }
//     });
//   }, [gltf, carColor]);

//   return <primitive object={gltf.scene} />;
// }


import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car({ carColor, modelUrl }) {
  const gltf = useLoader(GLTFLoader, modelUrl || process.env.PUBLIC_URL + "models/car/car3.glb");

  useEffect(() => {
    if (gltf) {
      // Set up the scale and position of the model
      gltf.scene.scale.set(55, 55, 55);
      gltf.scene.position.set(0, 0, 0);

      // Traverse the model to find specific meshes and apply color
      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;

          // Change color only for the specific mesh (you can customize the mesh name if needed)
          object.material.color.setRGB(carColor[0], carColor[1], carColor[2]);
        }
      });
    }
  }, [gltf, carColor]);

  return gltf ? <primitive object={gltf.scene} /> : null;
}
