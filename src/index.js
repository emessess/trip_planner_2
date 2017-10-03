const mapboxgl = require("mapbox-gl");
const { Map } = mapboxgl;
const buildMarker = require('./marker.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoia3luaWNsb2wiLCJhIjoiY2o4YnI3aGtyMDB1azJ4bXNrYXkzM2x4ciJ9.R_drmFi27DRJn5CO2V3y8Q';
const map = new Map({
	container: 'map',
	center : [-74.009, 40.705], // FullStack coordinates
	zoom: 15,
	style: "mapbox://styles/mapbox/streets-v10"
})

const marker = buildMarker('hotels', [-74.009, 40.705])
marker.addTo(map)