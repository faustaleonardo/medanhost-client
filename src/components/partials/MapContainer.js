import React from 'react';
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';

const mapContainer = ({ google }) => {
  const mapStyles = {
    width: 'auto',
    height: '450px',
  };

  return (
    <Map
      google={google}
      zoom={6}
      style={mapStyles}
      initialCenter={{ lat: 47.444, lng: -122.176 }}
    >
      <Marker position={{ lat: 48, lng: -122.0 }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(mapContainer);
