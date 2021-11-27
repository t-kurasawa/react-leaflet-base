import axios from 'axios';
import { LatLng } from "leaflet";

export interface SearchCondition {
    query:String ,
    location:LatLng
}

export const search = (condition:SearchCondition) => {
    const baseURL = 'https://overpass-api.de/api/interpreter?data=[out:json][timeout:30];';

    const south: Number = condition.location.lat - 0.025
    const west: Number = condition.location.lng - 0.025
    const north: Number = condition.location.lat + 0.025
    const east: Number = condition.location.lng + 0.025

    const query = `(
            node
            [highway=bus_stop]
            (`+ south +`,` + west + `,` + north + `,` + east + `);
            <;
       );
       out;
    `

    const url = baseURL + query;
    return axios.get(url.replace(/\s+/g, ''))
}