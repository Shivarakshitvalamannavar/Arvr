import React, { useEffect } from "react"; // Import React and useEffect for side effects.
import { useLoader } from "@react-three/fiber"; // Import useLoader to load 3D assets.
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Import GLTFLoader to handle GLTF/GLB models.
import { Mesh, Box3, Vector3 } from "three"; // Import Mesh, Box3 for bounding boxes, and Vector3 for 3D vectors.

export function Car({ carColor, modelUrl, setComponentNames, onComponentSelect }) {
  // Load the GLTF/GLB model using the provided URL or a default path.
  const gltf = useLoader(
    GLTFLoader,
    modelUrl || process.env.PUBLIC_URL + "models/car/car3.glb"
  );

  useEffect(() => {
    // Execute when the GLTF model is successfully loaded.
    if (gltf) {
      console.log("Model loaded:", gltf); // Log the loaded model for debugging purposes.

      // Calculate the bounding box of the loaded model.
      const box = new Box3().setFromObject(gltf.scene);

      // Vector to store the size of the bounding box.
      const size = new Vector3();

      // Compute the size of the bounding box and store it in `size`.
      box.getSize(size);

      // Define the desired size of the model to normalize its scale.
      const targetSize = 5; // Adjust this value as needed for your scene.

      // Determine the largest dimension of the model (x, y, or z).
      const maxDimension = Math.max(size.x, size.y, size.z);

      // Calculate the scaling factor to fit the model into the desired size.
      const scaleFactor = targetSize / maxDimension;

      // Apply uniform scaling to the model using the scaling factor.
      gltf.scene.scale.setScalar(scaleFactor);

      // Set the model's position in the 3D scene.
      gltf.scene.position.set(0, 0, 0);

      // Initialize an array to store the names of components (mesh objects).
      const components = [];

      // Traverse through all objects in the model to find meshes.
      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true; // Enable casting shadows for the mesh.
          object.receiveShadow = true; // Enable receiving shadows for the mesh.

          // If the mesh has a name, add it to the components list.
          if (object.name) {
            components.push(object.name);
          }

          // Store the object's name in userData for later reference.
          object.userData = { name: object.name };
        }
      });

      // Pass the list of component names to the parent component.
      setComponentNames(components);
    }
  }, [gltf, setComponentNames]); // Dependencies for re-running the effect.

  // Handle click events on the model's parts.
  const handleClick = (event) => {
    // Check if the click intersects with any objects in the scene.
    if (event.intersections.length > 0) {
      // Get the first intersected object.
      const selectedObject = event.intersections[0].object;

      // If the selected object is a Mesh, pass it to the parent component.
      if (selectedObject instanceof Mesh) {
        onComponentSelect(selectedObject);
      }
    }
  };

  // Render the model as a primitive object in the scene.
  return <primitive object={gltf.scene} onClick={handleClick} />;
}
