import React, { useState,  useEffect } from 'react';
import './App.css';
import './components/MapContainer'
import { MapContainer } from './components/MapContainer';
import {usePosition} from './components/usePosition';

const myPosition = [];
const defaultPosition = [51.0443141,-114.0632342];

const App = () => {
  const {latitude, longitude, error} = usePosition();
  const [position, setPosition] = useState(myPosition);

  useEffect(() => {
    setPosition([latitude, longitude]);
  },[latitude, longitude])
  
  return (
     <div className="App">
       <header className="App-header">
        <h1>
          Food and Restaurant Take Out Map
        </h1>
        <h5>
          We are looking for restaurants which are still open for take out.
          We can share this information with our neighborhood and help each other to sail through COVID 19.
        </h5>
      </header>
      {position[0]
        ? <MapContainer position={position} zoom={14}></MapContainer>
        : <MapContainer position={defaultPosition} zoom={10}></MapContainer>
      }
      Icon by <a target="_blank" href="https://loading.io/">loading.io</a>
    </div>
        
  );
  
}

export default App;
