import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from "leaflet";
import { getAllRestaurants } from '../services/Restaurant';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, List, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';

const leafletContainer = {
  width: '100%',
  height: '90vh',
}

export const homeIcon = new Icon({
  iconUrl: '/home.svg',
  iconSize: [35, 35]
})

export const defaultIcon = new Icon({
  iconUrl: '/default.svg',
  iconSize: [50, 50]
})

export const discountIcon = new Icon({
  iconUrl: '/discount.svg',
  iconSize: [50, 50]
})

const setIcon = (place) => {
  if (place.notes)
    return discountIcon;
  return defaultIcon;
}

const displayTime = (time, itemText) => {
  const items = time.split(',');
  return (
    items.map(item => (
      <ListItem>
        <ListItemText  className={itemText} primary={item}></ListItemText>
      </ListItem>
    ))
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop: '0px',
      marginBottom: '0x',
    },
    ListItem: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    itemText: {
      marginTop: '0px',
      marginBottom: '0px',
    }
  }),
);

export const MapContainer = ({ position, zoom }) => {
  const [activePlace, setActivePlace] = useState(null);
  const [list, setList] = useState({ restaurants: [] });
  const classes = useStyles();

  useEffect(() => {
    const getAllRestaurantsAsync = async () => {
      const value = await getAllRestaurants();
      setList(value._embedded);
      console.log(value);
    }
    getAllRestaurantsAsync();
  }, []);

  return (
    <>
      {
        position[0] && position[1] &&
        <Map style={leafletContainer} center={position} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

          <Marker
            key={0}
            position={[
              position[0],
              position[1]
            ]}
            icon={homeIcon}
          />
          {list.restaurants.map(place => (
            <Marker
              key={place.phone}
              position={[
                place.latitude,
                place.longitude
              ]}
              onClick={() => {
                setActivePlace(place);
              }}
              icon={setIcon(place)}
            />
          ))}

          {activePlace && (
            <Popup
              position={[
                activePlace.latitude,
                activePlace.longitude
              ]}
              onClose={() => {
                setActivePlace(null);
              }}
            >
                <Typography variant="h6">{activePlace.name}</Typography>
                <List dense={true} className={classes.ListItem}>
                  <ListItem >
                    <ListItemText className={classes.itemText} primary={activePlace.address}></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText className={classes.itemText} primary={activePlace.phone}></ListItemText>
                  </ListItem>
                  <ListItem>
                    <Button size="small" href={activePlace.website} target="_blank" rel="noopener">{activePlace.website}</Button>
                  </ListItem>
                  {activePlace.notes &&
                  <ListItem>
                    <ListItemText className={classes.itemText}><strong>{activePlace.notes}</strong></ListItemText>
                  </ListItem>
                  }
                  <Typography variant="button">Open Time</Typography>
                  <List dense={true} className={classes.ListItem}>
                    {displayTime(activePlace.open_time, classes.itemText)}
                  </List>
                </List>
            </Popup>
          )}
        </Map>
      }
    </>
  )
}
