import React, { useState, Suspense } from 'react'; // Import React and related hooks for state and lazy loading
import { Canvas } from '@react-three/fiber'; // Import Canvas to create 3D scenes
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'; // Import Drei components for camera controls and perspective
import '../styles/car.css'; // Import CSS styles
import { Ground } from '../ground'; // Import Ground component
import { Car } from '../car'; // Import Car component
import { Garage } from '../garage'; // Import Garage component

// The CarShow component renders the 3D scene, including the car, ground, and garage
function CarShow({ color1, color2, carColor, modelUrl, setComponentNames, onComponentSelect }) {
  return (
    <>
      {/* Enables interactive camera controls */}
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} maxDistance={5} />
      
      {/* Configures the perspective camera */}
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      
      {/* Renders the car model and handles interactions */}
      <Car
        carColor={carColor}
        modelUrl={modelUrl}
        setComponentNames={setComponentNames}
        onComponentSelect={onComponentSelect}
      />
      
      {/* Adds lighting to the scene */}
      <spotLight color={color1} intensity={1500} angle={0.6} penumbra={0.5} position={[5, 5, 0]} castShadow shadow-bias={-0.0001} />
      <spotLight color={color2} intensity={2000} angle={0.6} penumbra={0.5} position={[-5, 5, 0]} castShadow shadow-bias={-0.0001} />
      <hemisphereLight skyColor={[0, 0, 0]} groundColor={[0, 0, 0]} intensity={10} position={[0, 10, 0]} />
      
      {/* Ground and Garage components */}
      <Ground />
      <Garage />
    </>
  );
}

// The CarComp component handles state and user interactions for car customization
function CarComp() {
  // State variables for spotlight colors, car color, and uploaded model URL
  const [color1, setColor1] = useState([1, 0.25, 0.7]); // Spotlight 1 color
  const [color2, setColor2] = useState([1, 1, 0]); // Spotlight 2 color
  const [carColor, setCarColor] = useState([0.2, 0.2, 0.2]); // Default car color
  const [modelUrl, setModelUrl] = useState(null); // Store uploaded model URL

  // State variables for component management
  const [componentNames, setComponentNames] = useState([]); // Store names of car components
  const [selectedComponent, setSelectedComponent] = useState(null); // Track the selected component
  const [highlightColor, setHighlightColor] = useState('#FF8000'); // Default highlight color

  // State for storing default colors of components
  const [componentColors, setComponentColors] = useState({});

  // Handles file uploads for 3D car models
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setModelUrl(e.target.result); // Store the model's data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Handles component selection and applies a highlight color
  const handleComponentSelect = (component) => {
    if (component) {
      const componentName = component.name || 'default';
      
      // Store the default color if it hasn't been saved yet
      if (!componentColors[componentName]) {
        const currentColor = component.material.color;
        const defaultColor = `rgb(${Math.round(currentColor.r * 255)}, ${Math.round(currentColor.g * 255)}, ${Math.round(currentColor.b * 255)})`;
        setComponentColors((prevColors) => ({
          ...prevColors,
          [componentName]: defaultColor,
        }));
      }

      // Apply the highlight color to the component
      component.material.color.set(highlightColor);
      setSelectedComponent(component);
    }
  };

  // Changes the color of the selected component
  const handleSelectedComponentColorChange = (event) => {
    if (selectedComponent && selectedComponent.material) {
      const newColor = event.target.value;

      // Prevent changing the color to the highlight color
      if (newColor !== highlightColor) {
        selectedComponent.material.color.set(newColor); // Apply the new color
        const componentName = selectedComponent.name || 'default';
        setComponentColors((prevColors) => ({
          ...prevColors,
          [componentName]: newColor, // Update the color in the state
        }));
      }
    }
  };

  // Changes the color of Spotlight 1 dynamically
  const handleSpotlightColorChange1 = (index) => (event) => {
    const newColor = [...color1];
    newColor[index] = event.target.value / 255; // Normalize RGB values to 0-1
    setColor1(newColor);
  };

  // Changes the color of Spotlight 2 dynamically
  const handleSpotlightColorChange2 = (index) => (event) => {
    const newColor = [...color2];
    newColor[index] = event.target.value / 255; // Normalize RGB values to 0-1
    setColor2(newColor);
  };

  // Resets the selected component's color to its original value
  const handleResetColor = () => {
    if (selectedComponent && selectedComponent.material) {
      const defaultColor = componentColors[selectedComponent.name] || 'rgb(255, 255, 255)'; // Default to white
      selectedComponent.material.color.set(defaultColor); // Restore the default color
      setSelectedComponent(null); // Deselect the component
    }
  };

  return (
    <>
      <div className="controls">
        {/* Input for uploading 3D model files */}
        <input type="file" accept=".glb" onChange={handleFileUpload} style={{ marginTop: '20px' }} />
        
        {/* Controls for Spotlight 1 */}
        <div className="color-controls">
          <h3>Spotlight 1 Color</h3>
          <label>Red:</label>
          <input type="range" min="0" max="255" value={color1[0] * 255} onChange={handleSpotlightColorChange1(0)} />
          <span>{Math.round(color1[0] * 255)}</span>
          <label>Green:</label>
          <input type="range" min="0" max="255" value={color1[1] * 255} onChange={handleSpotlightColorChange1(1)} />
          <span>{Math.round(color1[1] * 255)}</span>
          <label>Blue:</label>
          <input type="range" min="0" max="255" value={color1[2] * 255} onChange={handleSpotlightColorChange1(2)} />
          <span>{Math.round(color1[2] * 255)}</span>
        </div>
        
        {/* Controls for Spotlight 2 */}
        <div className="color-controls">
          <h3>Spotlight 2 Color</h3>
          <label>Red:</label>
          <input type="range" min="0" max="255" value={color2[0] * 255} onChange={handleSpotlightColorChange2(0)} />
          <span>{Math.round(color2[0] * 255)}</span>
          <label>Green:</label>
          <input type="range" min="0" max="255" value={color2[1] * 255} onChange={handleSpotlightColorChange2(1)} />
          <span>{Math.round(color2[1] * 255)}</span>
          <label>Blue:</label>
          <input type="range" min="0" max="255" value={color2[2] * 255} onChange={handleSpotlightColorChange2(2)} />
          <span>{Math.round(color2[2] * 255)}</span>
        </div>

        {/* Display color controls for the selected component */}
        {selectedComponent && (
          <div className="color-controls">
            <h3>Selected Component Color</h3>
            <input type="color" value={highlightColor} onChange={handleSelectedComponentColorChange} />
            <button onClick={handleResetColor} style={{ marginTop: '10px' }}>
              Reset to Default
            </button>
          </div>
        )}
      </div>

      {/* 3D scene */}
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

export default CarComp; // Export the CarComp component
