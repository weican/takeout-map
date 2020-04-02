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
        <h1>
          Food and Restaurant Take Out Map
        </h1>
        <h5>
          We are looking for small restaurants which are still opening for take out.
          We can share this information with our neighborhood and help each other to sail through COVID 19.
        </h5>
      </header>
      {position &&
        <MapContainer position={position} value={"position"}></MapContainer>
      }
      Icon by <a target="_blank" href="https://loading.io/">loading.io</a>
    </div>
        
  );
  
}

export default App;
