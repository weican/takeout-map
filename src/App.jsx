import React, { useState,  useEffect } from 'react';
import './App.css';
import './components/MapContainer'
import { MapContainer } from './components/MapContainer';
import {usePosition} from './components/usePosition';

export const Position = [];

const App = () => {
  const {latitude, longitude, error} = usePosition();
  const [position, setPosition] = useState(Position);

  useEffect(() => {
    setPosition([latitude, longitude]);
  },[latitude, longitude])
  
  return (
     <div className="App">
       <header className="App-header">
        <p>
          Food and Restaurant Take Out Map
        </p>
      </header>
      {position &&
        <MapContainer position={position} value={"position"}></MapContainer>
      }
      Icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
        
  );
  
}

export default App;
