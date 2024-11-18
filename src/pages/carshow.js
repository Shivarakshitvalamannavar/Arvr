import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import '../styles/car.css';
import { Ground } from '../ground';
import { Car } from '../car';
import { Garage } from '../garage';

function CarShow({ color1, color2, carColor, modelUrl, setComponentNames, onComponentSelect }) {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} maxDistance={5} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      
      <Car
        carColor={carColor}
        modelUrl={modelUrl}
        setComponentNames={setComponentNames}
        onComponentSelect={onComponentSelect}
      />
      
      <spotLight color={color1} intensity={1500} angle={0.6} penumbra={0.5} position={[5, 5, 0]} castShadow shadow-bias={-0.0001} />
      <spotLight color={color2} intensity={2000} angle={0.6} penumbra={0.5} position={[-5, 5, 0]} castShadow shadow-bias={-0.0001} />
      <hemisphereLight skyColor={[0, 0, 0]} groundColor={[0, 0, 0]} intensity={10} position={[0, 10, 0]} />
      <Ground />
      <Garage />
    </>
  );
}

function CarComp() {
  const [color1, setColor1] = useState([1, 0.25, 0.7]); // Spotlight 1 color
  const [color2, setColor2] = useState([1, 1, 0]); // Spotlight 2 color
  const [carColor, setCarColor] = useState([0.2, 0.2, 0.2]); // Default car color
  const [modelUrl, setModelUrl] = useState(null); // Store uploaded model URL
  const [componentNames, setComponentNames] = useState([]); // Store component names
  const [selectedComponent, setSelectedComponent] = useState(null); // Track selected component
  const [highlightColor, setHighlightColor] = useState('#FF8000'); // Default highlight color (orange)

  // State to store the default colors of components
  const [componentColors, setComponentColors] = useState({});

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
    if (component) {
      const componentName = component.name || 'default';
      
      // Check if the color is already stored; otherwise, use the component's current color
      let defaultColor;
      if (componentColors[componentName]) {
        defaultColor = componentColors[componentName];
      } else {
        const currentColor = component.material.color;
        defaultColor = `rgb(${Math.round(currentColor.r * 255)}, ${Math.round(currentColor.g * 255)}, ${Math.round(currentColor.b * 255)})`;
        setComponentColors((prevColors) => ({
          ...prevColors,
          [componentName]: defaultColor,
        }));
      }

      // Highlight the component with the highlight color without changing its default color
      component.material.color.set(highlightColor);
      setSelectedComponent(component);
    }
  };

  const handleSelectedComponentColorChange = (event) => {
    if (selectedComponent && selectedComponent.material) {
      const newColor = event.target.value;
      
      // Update the component's material color if it is not the highlight color
      if (newColor !== highlightColor) {
        selectedComponent.material.color.set(newColor);
        const componentName = selectedComponent.name || 'default';
        setComponentColors((prevColors) => ({
          ...prevColors,
          [componentName]: newColor,
        }));
      }
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

  // Reset the selected component's color to default
  const handleResetColor = () => {
    if (selectedComponent && selectedComponent.material) {
      const defaultColor = componentColors[selectedComponent.name] || 'rgb(255, 255, 255)'; // Default to white if no color is set
      selectedComponent.material.color.set(defaultColor);
      setSelectedComponent(null); // Deselect the component
    }
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
          <span>{Math.round(color1[0] * 255)}</span>
          <label>Green:</label>
          <input type="range" min="0" max="255" value={color1[1] * 255} onChange={handleSpotlightColorChange1(1)} />
          <span>{Math.round(color1[1] * 255)}</span>
          <label>Blue:</label>
          <input type="range" min="0" max="255" value={color1[2] * 255} onChange={handleSpotlightColorChange1(2)} />
          <span>{Math.round(color1[2] * 255)}</span>
        </div>
        
        {/* Spotlight 2 color controls */}
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

        {/* Display color controls if a component is selected */}
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

export default CarComp;
