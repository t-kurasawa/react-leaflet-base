import React, {useState} from 'react';
import { MapContainer, TileLayer,useMapEvents, FeatureGroup, Popup, Circle, Tooltip } from "react-leaflet";
import Leaflet, { LatLng, LocationEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/OpenStreetMap.css"

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import search from '../apis/overpass-api';

interface Response {
  status:String,
  copyright:String,
  elements:Array<Element>
}

interface Element {
  id: number
  lat: number
  lon: number
  tags: {
    bus: String
    highway: String
    local_ref: String
    name: String
    'name:ja_kana': String
    operator: String
    public_transport: String
  }
  type: String  
}

function LocationMarker(props: any) {
  const fillBlueOptions = { fillColor: 'blue' }
  const fillRedOptions = { fillColor: 'red' }
  const [position, setPosition] = useState<LatLng>(new LatLng(35.6809591, 139.7673068))  
  const [places, setPlaces] = useState<Object>()

  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e:LocationEvent) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
      const asyncSearch = async () => {
        await search('bus_stop',new LatLng(e.latlng.lat, e.latlng.lng)).then((response:Response)=>{
            // response.elements.map(element=>(console.log(element)))
            setPlaces(response.elements.map(element=>(
              (element.type === 'node'
               ? (
                <Circle key={element.id} center={new LatLng(element.lat,element.lon)} radius={15} >
                  <Popup>
                    {element.tags.name}
                  </Popup>
                </Circle>
               ) 
               : null
              )
              
            )))

          }).catch(err=>{
            console.error(err)
        }).finally(()=>{
            // console.log('finally')
        })
      }
      asyncSearch()
    },
  })

  return position === null ? null : (
    <>
      <FeatureGroup pathOptions={fillBlueOptions}>
        <Circle center={position} radius={50} >
          <Tooltip direction="auto" permanent>
            現在地
          </Tooltip>
        </Circle>
      </FeatureGroup> 
      <FeatureGroup pathOptions={fillRedOptions}>
        {places}
      </FeatureGroup>
    </>
  )
}




function OpenStreetMap(props: any) {
  const position = new LatLng(35.6809591, 139.7673068)

  const DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  Leaflet.Marker.prototype.options.icon = DefaultIcon;

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker elements={props.elements}/>
    </MapContainer>
  );
}

export default OpenStreetMap;
