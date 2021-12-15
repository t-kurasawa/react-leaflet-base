import { useAppSelector, useAppDispatch } from '../hooks';
import { selectElements, selectPosition, searchAsync, locationfound } from '../stores/openstreetmap-slice';

import { LatLng, LocationEvent } from "leaflet";
import { useMapEvents, FeatureGroup, Popup, Circle, Tooltip, FeatureGroupProps } from "react-leaflet";

import { Typography } from '@mui/material';

export const LocationMarker = (props: FeatureGroupProps) => {
    const fillBlueOptions = { fillColor: 'blue' }

    const elements = useAppSelector(selectElements);
    const position = useAppSelector(selectPosition);
    const dispatch = useAppDispatch();
  
    const BusstopsCircle = elements.map(element=>(
        (element.type === 'node'
        ? (
        <Circle key={element.id} center={new LatLng(element.lat,element.lon)} radius={15} >
            <Popup>
                <Typography variant="body2" color="text.secondary">
                    {element.tags.name}
                </Typography>
            </Popup>
        </Circle>
        ) 
        : null
        )
    ))

    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e:LocationEvent) {
            map.flyTo(e.latlng, map.getZoom())
            dispatch(locationfound(new LatLng(e.latlng.lat, e.latlng.lng)))

            const location = new LatLng(e.latlng.lat, e.latlng.lng)
            const condition = {
                query: 'bus_stop',
                location: location
            }
            dispatch(searchAsync(condition))
        }
    })

    return position === null ? null : (
        <FeatureGroup pathOptions={fillBlueOptions}>
            <Circle center={position} radius={50} >
                <Tooltip direction="auto" permanent>
                    現在地
                </Tooltip>
            </Circle>
            {BusstopsCircle}
        </FeatureGroup>
    )
  }
  
export default LocationMarker;
