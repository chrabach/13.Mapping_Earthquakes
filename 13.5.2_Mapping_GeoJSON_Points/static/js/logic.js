//13.2.4
// Add console.log to check to see if our code is working.
//console.log("working");

//13.2.4
// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([37.6213, -122.3790], 5);
//13.5.2
// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);
//13.5.3
// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

//13.2.4
// We create the tile layer that will be the background of our map.

//13.4.1 changed style to dark -v10 (see the skill drill for why!)
//streets-v11
//satellite-streets-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,

    accessToken: API_KEY
});

// Then we add our 'streets' tile layer to the map.
streets.addTo(map);


//13.5.3
// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/chrabach/13.Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";



d3.json(airportData).then(function(data){
    console.log(data);
    L.geoJson(data).addTo(map);
});


 