import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import './googleMapComponent.scss';

const center = {
  lat: -3.745,
  lng: -38.523,
};
const zoom = 5;
const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB4km8unRgStvMe3HoXg3ld3jYEqr9u5Xo',
  });
  return isLoaded
    && (
    <GoogleMap center={center} zoom={zoom} mapContainerClassName="map_container">
      <MarkerF position={center} />
    </GoogleMap>
    );
};

export default GoogleMapComponent;
