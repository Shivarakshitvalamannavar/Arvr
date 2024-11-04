import React, { useEffect} from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export function Garage({ modelUrl }) {
  const gltf = useLoader(GLTFLoader, modelUrl || process.env.PUBLIC_URL + "models/garage/garage.glb");

  useEffect(() => {
    if (gltf) {
      console.log("Garage model loaded:", gltf);

      // Set up the scale and position of the garage model
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.position.set(0, 0.5, 0);
    }
  }, [gltf]);

  return gltf ? <primitive object={gltf.scene} /> : null;
}
