import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import "./map.css";



export const Leaflet = () => {
  

  return (
      <div id='mapId'>
          map
          <MapContainer
  className="markercluster-map"
  center={[51.0, 19.0]}
  zoom={4}
  maxZoom={18}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  <Marker position={[51.505, -0.09]}>
  <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
 
</MapContainer>
    </div>
  );
}