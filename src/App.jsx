import React, { useState,  useEffect } from 'react';
import { MapContainer } from './components/MapContainer';
import {usePosition} from './components/usePosition';
import StickyFooter from './components/Footer';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, Button, Typography } from '@material-ui/core';
import './App.css';
import './components/MapContainer';

const myPosition = [];
const defaultPosition = [51.0443141,-114.0632342];

const App = () => {
  const {latitude, longitude, error} = usePosition();
  const [position, setPosition] = useState(myPosition);

  useEffect(() => {
    setPosition([latitude, longitude]);
  },[latitude, longitude]);
  
  return (
     <div className="App">
       <header className="App-header">
        <Grid container
          direction="row"
          justify="space-between"
          alignItems="center">
            <Grid item xs={12} sm={11}>
            <Typography variant="h3" component="h2" gutterBottom>
                Food and Restaurant Take Out Map
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button variant="contained" color="white" disableElevation>
              <MenuIcon></MenuIcon>
              </Button>
            </Grid>
        </Grid>
        <Typography variant="body1">We are looking for restaurants which are still open for take out.
          We can share this information with our neighborhood and help each other to sail through COVID 19.</Typography>        
      </header>
      <body>
        {position[0]
          ? <MapContainer position={position} zoom={14}></MapContainer>
          : <MapContainer position={defaultPosition} zoom={10}></MapContainer>
        }
        
        <StickyFooter/>
      </body>
    </div>
        
  );
  
}

export default App;
