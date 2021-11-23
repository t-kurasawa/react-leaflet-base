import axios from 'axios';
import { LatLng } from "leaflet";

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
  

function search(conditions:String ,location:LatLng): Promise<Response>{
    // console.log('---search----')

    const overpass = 'https://overpass-api.de/api/interpreter';
    // const query = `(node[highway=bus_stop](35.6895014,139.5917337,35.7895014,139.6917337);<;);out;`

    const south: Number = location.lat - 0.025
    const west: Number = location.lng - 0.025
    const north: Number = location.lat + 0.025
    const east: Number = location.lng + 0.025

    const query = `(
            node
            [highway=bus_stop]
            (`+ south +`,`+west+`,`+north+`,`+east+`);
            <;
       );
       out;
    `

    const url = overpass + '?data=[out:json][timeout:30];' + query;
    // console.log(url.replace(/\s+/g, ''))

    return new Promise((resolve,reject)=>{
        axios.get(url.replace(/\s+/g, '')).then(result =>{
            // console.log(result.data)
            const copyright:String = result.data.osm3s.copyright
            const elements = result.data.elements
            const response:Response = {
                status: 'ok',
                copyright,elements
            }
            resolve(response)
        }).catch(err=>{
            console.error(err)
            const copyright:String = ''
            const elements = new Array<Element>()
            const response:Response = {
                status: 'error',
                copyright,elements
            }

            reject(response)
        })
    })

}

export default search;