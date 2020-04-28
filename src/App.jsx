import React, { useState,  useEffect } from 'react';
import { MapContainer } from './components/MapContainer';
import { usePosition } from './components/usePosition';
import StickyFooter from './components/Footer';
import MenuPopover from './components/MenuPopover';
import { Grid, Typography } from '@material-ui/core';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import TermOfUse from './pages/TermOfUse';
import './App.css';


const myPosition = [];
const defaultPosition = [51.0443141,-114.0632342];
ReactGA.initialize('UA-162986528-01');

const Home = () => {

  const {latitude, longitude } = usePosition();
  const [position, setPosition] = useState(myPosition);

  useEffect(() => {
    setPosition([latitude, longitude]);
  },[latitude, longitude]);
  
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, []);

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
        {/* <Grid item xs={12} sm={1}>
          <MenuPopover/>
        </Grid> */}
    </Grid>
    
    <Typography variant="h5">Select any marker to see restaurant  information and discount.<img width="45" height="35" src="./discount.svg" alt="discount"></img></Typography>
    <Typography variant="body1">This is a free tool for helping restaurants that are still open 
    for take out during COVID 19 pandemic by sharing restaurant information with our neighborhood. 
    If you are a restaurant owner or someone who is interested to share further nearby restaurant information with the public, 
    please feel free to email to us. Email: takeout-map@objectbit.ca
    </Typography>        
  </header>
    {position[0]
      ? <MapContainer position={position} zoom={14}></MapContainer>
      : <MapContainer position={defaultPosition} zoom={10}></MapContainer>
    }
    <StickyFooter/>
  </div>);
   
}

const About = () => {
  return <h1>About</h1>
}

const App = () => {

  return (
    <Router>
      <Switch>
        <Route  path="/" exact component={Home} />
        <Route  path="/about" exact component={About} />
        <Route  path="/TermOfUse" exact component={TermOfUse} />
      </Switch>
    </Router>
  );
  
}

export default App;
