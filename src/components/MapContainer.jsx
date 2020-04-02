import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import * as foodData from "../data/food-location.json";
import { Icon } from "leaflet";

const leafletContainer = {
  width: '100%',
  height: '90vh',
}

const position1 = [51.123160, -114.203180];

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
  if(place.properties.NOTES) 
    return discountIcon;
  return defaultIcon;  
}

export const MapContainer = ({position, value}) => {
  const [activePlace, setActivePlace] = useState(null);
  
  return (
    <>
    { 
      position[0] && position[1] &&
      <Map style={leafletContainer} center={position} zoom={14}>
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

        {foodData.features.map(place => (
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
        ))}

        {activePlace && (
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
        )}

        </Map> 
      }
    </>
    )
}
