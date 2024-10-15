// import React, { useState, Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import './style.css';
// import { Ground } from './ground';
// import { Car } from './car';

// function CarShow({ color1, color2, carColor }) {
//   return (
//     <>
//       <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
//       <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

//       {/* Pass carColor prop to Car component */}
//       <Car carColor={carColor} />
      
//       <spotLight
//         color={color1}
//         intensity={1500}
//         angle={0.6}
//         penumbra={0.5}
//         position={[5, 5, 0]}
//         castShadow
//         shadow-bias={-0.0001}
        
//       />
//       <spotLight
//         color={color2}
//         intensity={2000}
//         angle={0.6}
//         penumbra={0.5}
//         position={[-5, 5, 0]}
//         castShadow
//         shadow-bias={-0.0001}
//       />

//       <hemisphereLight
//         skyColor={[0,0,0 ]}   // Sky color (bright white)
//         groundColor={[0, 0, 0]}  // Ground color (dim grey)
//         intensity={10} // Adjust intensity
//         position={[0, 10, 0]} // Positioned above the spotlights
//       />

//       <Ground />
//     </>
//   );
// }

// function App() {
//   const [color1, setColor1] = useState([1, 0.25, 0.7]); // Default pink color for spotlight 1
//   const [color2, setColor2] = useState([1, 1, 0]); // Default yellow color for spotlight 2
//   const [carColor, setCarColor] = useState([0.2, 0.2, 0.2]); // Default car color (gray)

//   // Visibility state for spotlight sliders
//   const [showSpotlight1, setShowSpotlight1] = useState(false);
//   const [showSpotlight2, setShowSpotlight2] = useState(false);
//   const [showModel, setShowModel] = useState(false);

//   // Separate handlers for spotlight colors
//   const handleColorChange1 = (index) => (event) => {
//     const newColor = [...color1];
//     newColor[index] = event.target.value / 255; // Scale slider values (0-255) to (0-1)
//     setColor1(newColor);
//   };

//   const handleColorChange2 = (index) => (event) => {
//     const newColor = [...color2];
//     newColor[index] = event.target.value / 255; // Scale slider values (0-255) to (0-1)
//     setColor2(newColor);
//   };

//   // Handlers for car color
//   const handleCarColorChange = (index) => (event) => {
//     const newColor = [...carColor];
//     newColor[index] = event.target.value / 255; // Scale slider values (0-255) to (0-1)
//     setCarColor(newColor);
//   };

//   return (
//     <>
//       <div className="controls">
//         {/* Button to toggle spotlight 1 color controls */}
//         <button onClick={() => setShowSpotlight1((prev) => !prev)}>
//           Toggle Spotlight 1 Color Controls
//         </button>
//         {showSpotlight1 && (
//           <>
//             <h3>Spotlight 1 Color</h3>
//             <label>Red:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={color1[0] * 255}
//               onChange={handleColorChange1(0)}
//             />
//             <label>Green:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={color1[1] * 255}
//               onChange={handleColorChange1(1)}
//             />
//             <label>Blue:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={color1[2] * 255}
//               onChange={handleColorChange1(2)}
//             />
//           </>
//         )}

//         {/* Button to toggle spotlight 2 color controls */}
//         <button onClick={() => setShowSpotlight2((prev) => !prev)}>
//           Toggle Spotlight 2 Color Controls
//         </button>
//         {showSpotlight2 && (
//           <>
//             <h3>Spotlight 2 Color</h3>
//             <label>Red:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={color2[0] * 255}
//               onChange={handleColorChange2(0)}
//             />
//             <label>Green:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={color2[1] * 255}
//               onChange={handleColorChange2(1)}
//             />
//             <label>Blue:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={color2[2] * 255}
//               onChange={handleColorChange2(2)}
//             />
//           </>
//         )}

//         {/* Car color controls */}
//         <button onClick={() => setShowModel((prev) => !prev)}>
//           Toggle Car Color Controls
//         </button>
//         {showModel && (
//           <>
//             <h3>Car Color</h3>
//             <label>Red:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={carColor[0] * 255}
//               onChange={handleCarColorChange(0)}
//             />
//             <label>Green:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={carColor[1] * 255}
//               onChange={handleCarColorChange(1)}
//             />
//             <label>Blue:</label>
//             <input
//               type="range"
//               min="0"
//               max="255"
//               value={carColor[2] * 255}
//               onChange={handleCarColorChange(2)}
//             />
//           </>
//         )}
        
//       </div>

//       <Suspense fallback={null}>
//         <Canvas shadows>
//           <CarShow color1={color1} color2={color2} carColor={carColor} />
//         </Canvas>
//       </Suspense>
//     </>
//   );
// }

// export default App;

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Ground } from './ground';
import { Car } from './car';

function CarShow({ color1, color2, carColor, modelUrl }) {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* Pass carColor and modelUrl props to Car component */}
      <Car carColor={carColor} modelUrl={modelUrl} />

      <spotLight
        color={color1}
        intensity={1500}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={color2}
        intensity={2000}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <hemisphereLight
        skyColor={[0, 0, 0]}
        groundColor={[0, 0, 0]}
        intensity={10}
        position={[0, 10, 0]}
      />
      <Ground />
    </>
  );
}

function App() {
  const [color1, setColor1] = useState([1, 0.25, 0.7]); // Spotlight 1 color
  const [color2, setColor2] = useState([1, 1, 0]); // Spotlight 2 color
  const [carColor, setCarColor] = useState([0.2, 0.2, 0.2]); // Car color
  const [modelUrl, setModelUrl] = useState(null); // Store uploaded model URL

  const [showSpotlight1, setShowSpotlight1] = useState(false);
  const [showSpotlight2, setShowSpotlight2] = useState(false);
  const [showModel, setShowModel] = useState(false);

  // Handle file upload for the car model
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setModelUrl(e.target.result); // Set the uploaded file as the model URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange1 = (index) => (event) => {
    const newColor = [...color1];
    newColor[index] = event.target.value / 255;
    setColor1(newColor);
  };

  const handleColorChange2 = (index) => (event) => {
    const newColor = [...color2];
    newColor[index] = event.target.value / 255;
    setColor2(newColor);
  };

  const handleCarColorChange = (index) => (event) => {
    const newColor = [...carColor];
    newColor[index] = event.target.value / 255;
    setCarColor(newColor);
  };

  return (
    <>
      <div className="controls">
        {/* UI controls for spotlight and car color */}
        <button onClick={() => setShowSpotlight1((prev) => !prev)}>Toggle Spotlight 1 Color Controls</button>
        {showSpotlight1 && (
          <>
            <h3>Spotlight 1 Color</h3>
            <label>Red:</label>
            <input type="range" min="0" max="255" value={color1[0] * 255} onChange={handleColorChange1(0)} />
            <label>Green:</label>
            <input type="range" min="0" max="255" value={color1[1] * 255} onChange={handleColorChange1(1)} />
            <label>Blue:</label>
            <input type="range" min="0" max="255" value={color1[2] * 255} onChange={handleColorChange1(2)} />
          </>
        )}

        <button onClick={() => setShowSpotlight2((prev) => !prev)}>Toggle Spotlight 2 Color Controls</button>
        {showSpotlight2 && (
          <>
            <h3>Spotlight 2 Color</h3>
            <label>Red:</label>
            <input type="range" min="0" max="255" value={color2[0] * 255} onChange={handleColorChange2(0)} />
            <label>Green:</label>
            <input type="range" min="0" max="255" value={color2[1] * 255} onChange={handleColorChange2(1)} />
            <label>Blue:</label>
            <input type="range" min="0" max="255" value={color2[2] * 255} onChange={handleColorChange2(2)} />
          </>
        )}

        <button onClick={() => setShowModel((prev) => !prev)}>Toggle Car Color Controls</button>
        {showModel && (
          <>
            <h3>Car Color</h3>
            <label>Red:</label>
            <input type="range" min="0" max="255" value={carColor[0] * 255} onChange={handleCarColorChange(0)} />
            <label>Green:</label>
            <input type="range" min="0" max="255" value={carColor[1] * 255} onChange={handleCarColorChange(1)} />
            <label>Blue:</label>
            <input type="range" min="0" max="255" value={carColor[2] * 255} onChange={handleCarColorChange(2)} />
          </>
        )}

        {/* Add file input for model upload here */}
        <input type="file" accept=".glb" onChange={handleFileUpload} style={{ marginTop: '20px' }} />
      </div>

      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow color1={color1} color2={color2} carColor={carColor} modelUrl={modelUrl} />
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;

