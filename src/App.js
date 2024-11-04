// import React, { useState, Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import './style.css';
// import { Ground } from './ground';
// import { Car } from './car';

// function CarShow({ color1, color2, carColor, modelUrl }) {
//   return (
//     <>
//       <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
//       <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

//       {/* Pass carColor and modelUrl props to Car component */}
//       <Car carColor={carColor} modelUrl={modelUrl} />

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
//         skyColor={[0, 0, 0]}
//         groundColor={[0, 0, 0]}
//         intensity={10}
//         position={[0, 10, 0]}
//       />
//       <Ground />
//     </>
//   );
// }

// function App() {
//   const [color1, setColor1] = useState([1, 0.25, 0.7]); // Spotlight 1 color
//   const [color2, setColor2] = useState([1, 1, 0]); // Spotlight 2 color
//   const [carColor, setCarColor] = useState([0.2, 0.2, 0.2]); // Car color
//   const [modelUrl, setModelUrl] = useState(null); // Store uploaded model URL

//   const [showSpotlight1, setShowSpotlight1] = useState(false);
//   const [showSpotlight2, setShowSpotlight2] = useState(false);
//   const [showModel, setShowModel] = useState(false);

//   // Handle file upload for the car model
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setModelUrl(e.target.result); // Set the uploaded file as the model URL
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleColorChange1 = (index) => (event) => {
//     const newColor = [...color1];
//     newColor[index] = event.target.value / 255;
//     setColor1(newColor);
//   };

//   const handleColorChange2 = (index) => (event) => {
//     const newColor = [...color2];
//     newColor[index] = event.target.value / 255;
//     setColor2(newColor);
//   };

//   const handleCarColorChange = (index) => (event) => {
//     const newColor = [...carColor];
//     newColor[index] = event.target.value / 255;
//     setCarColor(newColor);
//   };

//   return (
//     <>
//       <div className="controls">
//         {/* UI controls for spotlight and car color */}
//         <button onClick={() => setShowSpotlight1((prev) => !prev)}>Toggle Spotlight 1 Color Controls</button>
//         {showSpotlight1 && (
//           <>
//             <h3>Spotlight 1 Color</h3>
//             <label>Red:</label>
//             <input type="range" min="0" max="255" value={color1[0] * 255} onChange={handleColorChange1(0)} />
//             <label>Green:</label>
//             <input type="range" min="0" max="255" value={color1[1] * 255} onChange={handleColorChange1(1)} />
//             <label>Blue:</label>
//             <input type="range" min="0" max="255" value={color1[2] * 255} onChange={handleColorChange1(2)} />
//           </>
//         )}

//         <button onClick={() => setShowSpotlight2((prev) => !prev)}>Toggle Spotlight 2 Color Controls</button>
//         {showSpotlight2 && (
//           <>
//             <h3>Spotlight 2 Color</h3>
//             <label>Red:</label>
//             <input type="range" min="0" max="255" value={color2[0] * 255} onChange={handleColorChange2(0)} />
//             <label>Green:</label>
//             <input type="range" min="0" max="255" value={color2[1] * 255} onChange={handleColorChange2(1)} />
//             <label>Blue:</label>
//             <input type="range" min="0" max="255" value={color2[2] * 255} onChange={handleColorChange2(2)} />
//           </>
//         )}

//         <button onClick={() => setShowModel((prev) => !prev)}>Toggle Car Color Controls</button>
//         {showModel && (
//           <>
//             <h3>Car Color</h3>
//             <label>Red:</label>
//             <input type="range" min="0" max="255" value={carColor[0] * 255} onChange={handleCarColorChange(0)} />
//             <label>Green:</label>
//             <input type="range" min="0" max="255" value={carColor[1] * 255} onChange={handleCarColorChange(1)} />
//             <label>Blue:</label>
//             <input type="range" min="0" max="255" value={carColor[2] * 255} onChange={handleCarColorChange(2)} />
//           </>
//         )}

//         {/* Add file input for model upload here */}
//         <input type="file" accept=".glb" onChange={handleFileUpload} style={{ marginTop: '20px' }} />
//       </div>

//       <Suspense fallback={null}>
//         <Canvas shadows>
//           <CarShow color1={color1} color2={color2} carColor={carColor} modelUrl={modelUrl} />
//         </Canvas>
//       </Suspense>
//     </>
//   );
// }

// export default App;


// App.js

// import React, { useState, Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import './style.css';
// import { Ground } from './ground';
// import { Car } from './car';
// import { Garage } from './garage';

// function CarShow({ color1, color2, carColor, modelUrl, setComponentNames, onComponentSelect }) {
//   return (
//     <>
//       <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
//       <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

//       <Car
//         carColor={carColor}
//         modelUrl={modelUrl}
//         setComponentNames={setComponentNames}
//         onComponentSelect={onComponentSelect}
//       />

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
//         skyColor={[0, 0, 0]}
//         groundColor={[0, 0, 0]}
//         intensity={10}
//         position={[0, 10, 0]}
//       />
//       <Ground />
//       <Garage/>
//     </>
//   );
// }

// function App() {
//   const [color1, setColor1] = useState([1, 0.25, 0.7]); // Spotlight 1 color
//   const [color2, setColor2] = useState([1, 1, 0]); // Spotlight 2 color
//   const [carColor, setCarColor] = useState([0.2, 0.2, 0.2]); // Default car color
//   const [modelUrl, setModelUrl] = useState(null); // Store uploaded model URL
//   const [componentNames, setComponentNames] = useState([]); // Store component names
//   const [selectedComponent, setSelectedComponent] = useState(null); // Track selected component

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setModelUrl(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleComponentSelect = (component) => {
//     setSelectedComponent(component);
//   };

//   const handleSelectedComponentColorChange = (index) => (event) => {
//     if (selectedComponent && selectedComponent.material) {
//       const newColor = [...carColor];
//       newColor[index] = event.target.value / 255;
//       setCarColor(newColor);
//       selectedComponent.material.color.setRGB(newColor[0], newColor[1], newColor[2]);
//     }
//   };

//   return (
//     <>
//       <div className="controls">
//         {/* Upload model */}

        
//         <input type="file" accept=".glb" onChange={handleFileUpload} style={{ marginTop: '20px' }} />

//         {/* Display color controls if a component is selected */}
//         {selectedComponent && (
//           <div className="color-controls">
//             <h3>Selected Component: {selectedComponent.userData.name}</h3>
//             <label>Red:</label>
//             <input type="range" min="0" max="255" value={carColor[0] * 255} onChange={handleSelectedComponentColorChange(0)} />
//             <label>Green:</label>
//             <input type="range" min="0" max="255" value={carColor[1] * 255} onChange={handleSelectedComponentColorChange(1)} />
//             <label>Blue:</label>
//             <input type="range" min="0" max="255" value={carColor[2] * 255} onChange={handleSelectedComponentColorChange(2)} />
//           </div>
//         )}
//       </div>

//       <Suspense fallback={null}>
//         <Canvas shadows>
//           <CarShow
//             color1={color1}
//             color2={color2}
//             carColor={carColor}
//             modelUrl={modelUrl}
//             setComponentNames={setComponentNames}
//             onComponentSelect={handleComponentSelect}
//           />
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
import { Garage } from './garage';

function CarShow({ color1, color2, carColor, modelUrl, setComponentNames, onComponentSelect }) {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <Car
        carColor={carColor}
        modelUrl={modelUrl}
        setComponentNames={setComponentNames}
        onComponentSelect={onComponentSelect}
      />

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
      <Garage/>
    </>
  );
}

function App() {
  const [color1, setColor1] = useState([1, 0.25, 0.7]); // Spotlight 1 color
  const [color2, setColor2] = useState([1, 1, 0]); // Spotlight 2 color
  const [carColor, setCarColor] = useState([0.2, 0.2, 0.2]); // Default car color
  const [modelUrl, setModelUrl] = useState(null); // Store uploaded model URL
  const [componentNames, setComponentNames] = useState([]); // Store component names
  const [selectedComponent, setSelectedComponent] = useState(null); // Track selected component

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setModelUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  const handleSelectedComponentColorChange = (index) => (event) => {
    if (selectedComponent && selectedComponent.material) {
      const newColor = [...carColor];
      newColor[index] = event.target.value / 255;
      setCarColor(newColor);
      selectedComponent.material.color.setRGB(newColor[0], newColor[1], newColor[2]);
    }
  };

  const handleSpotlightColorChange1 = (index) => (event) => {
    const newColor = [...color1];
    newColor[index] = event.target.value / 255;
    setColor1(newColor);
  };

  const handleSpotlightColorChange2 = (index) => (event) => {
    const newColor = [...color2];
    newColor[index] = event.target.value / 255;
    setColor2(newColor);
  };

  return (
    <>
      <div className="controls">
        {/* Upload model */}
        <input type="file" accept=".glb" onChange={handleFileUpload} style={{ marginTop: '20px' }} />

        {/* Spotlight 1 color controls */}
        <div className="color-controls">
          <h3>Spotlight 1 Color</h3>
          <label>Red:</label>
          <input type="range" min="0" max="255" value={color1[0] * 255} onChange={handleSpotlightColorChange1(0)} />
          <label>Green:</label>
          <input type="range" min="0" max="255" value={color1[1] * 255} onChange={handleSpotlightColorChange1(1)} />
          <label>Blue:</label>
          <input type="range" min="0" max="255" value={color1[2] * 255} onChange={handleSpotlightColorChange1(2)} />
        </div>

        {/* Spotlight 2 color controls */}
        <div className="color-controls">
          <h3>Spotlight 2 Color</h3>
          <label>Red:</label>
          <input type="range" min="0" max="255" value={color2[0] * 255} onChange={handleSpotlightColorChange2(0)} />
          <label>Green:</label>
          <input type="range" min="0" max="255" value={color2[1] * 255} onChange={handleSpotlightColorChange2(1)} />
          <label>Blue:</label>
          <input type="range" min="0" max="255" value={color2[2] * 255} onChange={handleSpotlightColorChange2(2)} />
        </div>

        {/* Display color controls if a component is selected */}
        {selectedComponent && (
          <div className="color-controls">
            <h3>Selected Component: {selectedComponent.userData.name}</h3>
            <label>Red:</label>
            <input type="range" min="0" max="255" value={carColor[0] * 255} onChange={handleSelectedComponentColorChange(0)} />
            <label>Green:</label>
            <input type="range" min="0" max="255" value={carColor[1] * 255} onChange={handleSelectedComponentColorChange(1)} />
            <label>Blue:</label>
            <input type="range" min="0" max="255" value={carColor[2] * 255} onChange={handleSelectedComponentColorChange(2)} />
          </div>
        )}
      </div>

      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow
            color1={color1}
            color2={color2}
            carColor={carColor}
            modelUrl={modelUrl}
            setComponentNames={setComponentNames}
            onComponentSelect={handleComponentSelect}
          />
          
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
