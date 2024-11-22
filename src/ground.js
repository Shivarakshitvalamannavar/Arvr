// Importing the `MeshReflectorMaterial` from the Drei library for creating a reflective ground plane
import { MeshReflectorMaterial } from "@react-three/drei";

// Importing `LinearEncoding` for handling texture encoding (deprecated but used for compatibility here)
import { LinearEncoding } from "@react-three/drei/helpers/deprecated";

// Importing the `useLoader` hook from React Three Fiber for loading textures
import { useLoader } from "@react-three/fiber";

// Importing `useEffect` to apply side effects, such as modifying texture properties
import { useEffect } from "react";

// Importing `RepeatWrapping` and `TextureLoader` from Three.js for texture handling
import { RepeatWrapping, TextureLoader } from "three";

// Defining the `Ground` component to create a textured reflective ground plane
export function Ground() {
  // Using `useLoader` to load roughness and normal textures for the ground material
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/terrain-roughness.jpg", // Path to roughness texture
    process.env.PUBLIC_URL + "textures/terrain-normal.jpg", // Path to normal texture
  ]);

  // Using `useEffect` to apply texture properties after loading
  useEffect(() => {
    // Apply wrapping and repetition settings to both textures
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping; // Wrap texture horizontally
      t.wrapT = RepeatWrapping; // Wrap texture vertically
      t.repeat.set(5, 5); // Repeat the texture 5 times in both directions
    });

    // Set the encoding for the normal texture to LinearEncoding
    normal.encoding = LinearEncoding;
  }, [normal, roughness]); // Dependencies: re-run the effect when textures change

  // Returning a mesh that represents the ground
  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      {/* Adding a plane geometry with width and height of 30 units */}
      <planeGeometry args={[30, 30]} />

      {/* Using `MeshReflectorMaterial` to create a reflective material for the ground */}
      <MeshReflectorMaterial
        envMapIntensity={0} // Disables environment map influence
        normalMap={normal} // Applies the loaded normal texture
        normalScale={[0.15, 0.15]} // Scales the normal map effect
        roughnessMap={roughness} // Applies the loaded roughness texture
        dithering={true} // Enables dithering for smoother color transitions
        color={[0.015, 0.015, 0.015]} // Sets a dark base color for the ground
        roughness={0.7} // Adjusts the overall roughness of the material
        blur={[1000, 400]} // Controls blur strength for reflection
        mixBlur={30} // Intensity of mixing reflection blur
        mixStrength={80} // Reflection strength
        mixContrast={1} // Reflection contrast
        resolution={1024} // Resolution of the reflection texture
        mirror={0} // Reflection strength (0 means no mirroring)
        depthScale={0.01} // Depth scale for reflection distortion
        minDepthThreshold={0.9} // Minimum depth threshold for reflection
        maxDepthThreshold={1} // Maximum depth threshold for reflection
        depthToBlurRatioBias={0.25} // Bias for depth-based blur
        debug={0} // Debug mode (0 means disabled)
        reflectorOffset={0.2} // Slight offset for the reflection plane
      />
    </mesh>
  );
}
