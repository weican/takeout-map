import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
 
const GooglePlacesAuto = () => (
  <div>
    <GooglePlacesAutocomplete
      onSelect={console.log}
      apiKey={"AIzaSyDDXMCdsc5wa6et-O8M86J3Qjt55txPS3s"}
      withSessionToken={true}
    />
  </div>
);
 
export default GooglePlacesAuto;