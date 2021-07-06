//13.2.4
// Add console.log to check to see if our code is working.
console.log("working");

//13.2.4
// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

//13.2.4
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    //id: 'mapbox/streets-v11',
    //tileSize: 512,
    //zoomOffset: -1,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//13.2.4
//change maps style, change the map id
