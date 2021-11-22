import axios from 'axios';

const overpass = 'https://overpass-api.de/api/interpreter';
const query = `
   (
        node
        [highway=bus_stop]
        (35.6895014,139.5917337,35.7895014,139.6917337);
        <;
   );
   out;
`
const url = overpass + '?data=[out:json][timeout:30];' + query;

axios.get(url).then(result =>{
    console.log(result.data)
})
