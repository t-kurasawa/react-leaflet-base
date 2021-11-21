import React from 'react';
import { MapContainer, TileLayer,Marker,Popup  } from "react-leaflet";
import Leaflet, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import './App.css';

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function App() {
  const position = new LatLng(35.688408, 139.692005)

  const DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  Leaflet.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="App">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
