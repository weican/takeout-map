import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from "leaflet";
import { getAllRestaurants } from '../services/Restaurant';

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

const setIcon = (place) =>{
  if(place.notes) 
    return discountIcon;
  return defaultIcon;  
}

export const MapContainer = ({position, zoom}) => {
  const [activePlace, setActivePlace] = useState(null);
  const [list, setList] = useState({ restaurants: [] });

  useEffect(() => {
    const getAllRestaurantsAsync = async() => {
      const value = await getAllRestaurants();
      setList(value._embedded);
      console.log(value);
    }
    getAllRestaurantsAsync();
  },[]);
  
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
            <div>
              <h2>{activePlace.name}</h2>
              <p>{activePlace.open_time}</p>
              <p>{activePlace.address}</p>
              <p><strong>{activePlace.notes}</strong></p>
              <p>{activePlace.phone}</p>
              <a href={activePlace.website}>{activePlace.website}</a>
            </div>
          </Popup>
        )}

        {/* {foodData.features.map(place => (
          <Marker
            key={place.properties.LOCATION_ID}
            position={[
              place.geometry.coordinates[0],
              place.geometry.coordinates[1]
            ]}
            onClick={() => {
              setActivePlace(place);
            }}
            icon={setIcon(place)}
          />
        ))} */}

        {/* {activePlace && (
          <Popup
            position={[
              activePlace.geometry.coordinates[0],
              activePlace.geometry.coordinates[1]
            ]}
            onClose={() => {
              setActivePlace(null);
            }}
          >
            <div>
              <h2>{activePlace.properties.NAME}</h2>
              <h3>{activePlace.properties.DESCRIPTIO}</h3>
              <p>{activePlace.properties.OPEN}</p>
              <p>{activePlace.properties.ADDRESS}</p>
              <p>{activePlace.properties.NOTES}</p>
              <p>{activePlace.properties.PHONE}</p>
              <a href={activePlace.properties.WEBSITE}>{activePlace.properties.WEBSITE}</a>
            </div>
          </Popup>
        )} */}

        </Map> 
      }
    </>
    )
}
