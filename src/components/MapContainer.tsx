import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from "leaflet";
import { getAllRestaurants } from '../services/Restaurant';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { Place } from './Place';
import CityPanel from './CityPanel';
import Moment from 'react-moment';
import Control from 'react-leaflet-control';
import { AES, enc } from 'crypto-js';
import { partPassword } from './PartPass';
import ReactGA from 'react-ga';
import SnackNotificationBar from './SnackNotificationBar';
import _ from 'lodash';
import EditRestaurantDialog from './EditRestaurantDialog';
import CategoryPanel from './CategoryPanel';

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

const setIcon = (place: Place) => {
  
  if(decrypt(place.notes) !== "")
      return discountIcon; 
  return defaultIcon;
}

const displayTime = (time:string, itemText: string) => {
  const items = time.split(',');
  return (
    items.map((item, index) => (
      <ListItem key={index}>
        <ListItemText  className={itemText} primary={item}></ListItemText>
      </ListItem>
    ))
  )
}

const useStyles = makeStyles((theme:Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginTop: '0px',
      marginBottom: '0x',
    },
    listItem: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    itemText: {
      marginTop: '0px',
      marginBottom: '0px',
    },
    linkButton: {
      overflow: "hidden",
      textOverflow: 'ellipsis',
      whiteSpace: "nowrap",
    }
  }),
);

export type Viewport = {
  center: [number, number],
  zoom: number,
}

const decrypt = (text: string) => {
  const data = enc.Base64.parse(text).toString(enc.Utf8);
  return AES.decrypt(data, `jNb/Za7huP2Mja=9${partPassword()}`).toString(enc.Utf8);
}

const onClickLink = (activePlace: Place) => {
    ReactGA.event({
      category: 'Marker',
      action: `Click Link/${activePlace.phone}`,
      label: activePlace.website,
      nonInteraction: true
    });
}

const getLastUpdatedDate = (restaurants: Place[]) => {
  const sortedRestaurants = _.sortBy(restaurants, (value) => {
    return value.created_at;
  });
  if(sortedRestaurants[sortedRestaurants.length-1])
    return sortedRestaurants[sortedRestaurants.length-1];
};

export const MapContainer = ({ position, zoom }: any) => {
  const [activePlace, setActivePlace] = useState<Place | null>(null);
  const [list, setList] = useState({ restaurants: [] });
  const [lastPlace, setLastPlace] = useState<Place>();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const classes = useStyles();
  const [viewport, setViewport] = useState<Viewport>({
    center: [position[0], position[1]],
    zoom: 14,
  });

  useEffect(() => {
    const getAllRestaurantsAsync = async () => {
      const value = await getAllRestaurants();
      setList(value._embedded);
      // console.log(value._embedded.restaurants);
      const place = getLastUpdatedDate(value._embedded.restaurants);
      if(place)
      setLastPlace(place);
    }
    getAllRestaurantsAsync();
  }, []);

  useEffect(() => {
    setViewport({
      center: [position[0], position[1]],
      zoom: 14,
    });
  }, [position]);

  
  const onClickEdit = (activePlace: Place) => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  }

  return (
    <>
      {
        viewport.center[0] && viewport.center[1] &&
        <Map style={leafletContainer} zoom={zoom} viewport={viewport}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          
          <Control position="topright" >
            <CityPanel viewport={setViewport} currentPosition={position} zoom={zoom}/>
          </Control>
          <Control position="topright" >
            <CategoryPanel onSelectedCategory={onSelectedCategory}/>
          </Control>
          <Marker
            key={0}
            position={[
              viewport.center[0],
              viewport.center[1]
            ]}
            icon={homeIcon}
          />
          {list.restaurants
            .filter((place: Place) => place.category.name === selectedCategory || selectedCategory === 'All')
            .map((place:Place) => (
              <Marker
                key={place.phone}
                position={[
                  place.latitude,
                  place.longitude
                ]}
                onClick={() => {
                  ReactGA.event({
                    category: 'Marker',
                    action: 'Select Marker',
                    label: `${place.name}/${place.phone}` ,
                    nonInteraction: true
                  });
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
                <Typography variant="h6">
                  {activePlace.name} 
                  {/* <Button onClick={() => onClickEdit(activePlace)}>Edit</Button> */}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom color="textSecondary">
                  Updated <Moment fromNow>{activePlace.updated_at?.toString()}</Moment>
                </Typography>
                <List dense={true} className={classes.listItem}>
                  <ListItem >
                    <ListItemText className={classes.itemText} primary={activePlace.address}></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText className={classes.itemText} primary={activePlace.phone}></ListItemText>
                  </ListItem>
                  <ListItem>
                    <a className={classes.linkButton} href={activePlace.website} onClick={() => onClickLink(activePlace)} target="_blank" rel="noopener noreferrer">
                      {activePlace.website}
                    </a>
                  </ListItem>
                  {decrypt(activePlace.notes) !== "" &&
                  <ListItem>
                    <ListItemText className={classes.itemText}><strong>{decrypt(activePlace.notes)}</strong></ListItemText>
                  </ListItem>
                  }
                  <Typography variant="button">Open Time</Typography>
                  <List dense={true} className={classes.listItem}>
                    {displayTime(activePlace.open_time, classes.itemText)}
                  </List>
                </List>
            </Popup>
          )}
        </Map>
      }
      { lastPlace &&
      <SnackNotificationBar openDialog={true} duration={5000} message={lastPlace} /> }
      {
        open && activePlace &&
        <EditRestaurantDialog openModal={open} editData={activePlace} closeModal={handleClose}/> 
      } */}
    </>

  )
}
