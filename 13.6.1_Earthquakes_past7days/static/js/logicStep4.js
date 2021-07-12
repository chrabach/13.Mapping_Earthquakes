//13.2.4
// Add console.log to check to see if our code is working.
console.log("working");

//13.2.4
// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([37.6213, -122.3790], 5);
//13.5.2
// Create the map object with center at the San Francisco airport.
//let map = L.map('mapid').setView([44.0, -80.0], 2);
//13.5.3
// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

//13.2.4
// We create the tile layer that will be the background of our map.

//13.4.1 changed style to dark -v10 (see the skill drill for why!)
//streets-v11
//satellite-streets-v11
//light-v10
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,

    accessToken: API_KEY
});



let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


//13.5.6
let baseMaps = {
	"Streets":streets,
	"Satellite Streets" : satelliteStreets
};


//13.6.4
let earthquakes = new L.layerGroup();

//13.6.4
// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};


//Create the map object with center, zoom level and default layer.
let map = new L.Map('mapid', {
	center: [3.9,-98.5],
	zoom:3,
	layers:[streets]
});

//13.5.5
// Accessing the Toronto airline routes GeoJSON URL.
//let torontoData = "https://raw.githubusercontent.com/chrabach/13.Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";



// Create a style for the lines.
//let myStyle = {
//    color: "#ffffa1",
//    weight: 2
//}





//adding in 13.6.4
// Then we add our 'streets' tile layer to the map.
L.control.layers(baseMaps,overlays).addTo(map);


//13.5.3
// Accessing the airport GeoJSON URL
//let airportData = "https://raw.githubusercontent.com/chrabach/13.Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";


//13.5.6
// Accessing the Toronto neighborhoods GeoJSON URL.
//let torontoHoods = "https://raw.githubusercontent.com/chrabach/13.Mapping_Earthquakes/main/torontoNeighborhoods.json";


//13.6.1
let earthquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(earthquake).then(function(data){
    //console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
              //console.log(data);
              return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
        // We create a popup for each circleMarker to display the magnitude and
        //  location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }

    }).addTo(map);


    earthquakes.addTo(map);







    function styleInfo(feature) {
        return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
        };
    }


//13.6.3
// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }
    

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
        return 1;
        }
        return magnitude * 4;
}


});


 