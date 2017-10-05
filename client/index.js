const mapboxgl = require('mapbox-gl');
const { Map } = mapboxgl;
const buildMarker = require('./marker.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoia3luaWNsb2wiLCJhIjoiY2o4YnI3aGtyMDB1azJ4bXNrYXkzM2x4ciJ9.R_drmFi27DRJn5CO2V3y8Q';
const map = new Map({
  container: 'map',
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 15,
  style: 'mapbox://styles/mapbox/streets-v10'
});

const marker = buildMarker('hotels', [-74.009, 40.705]);
marker.addTo(map);

const hotelList = document.getElementById('hotels-choices');
const restaurantList = document.getElementById('restaurants-choices');
const activityList = document.getElementById('activities-choices');

const makeMenus = (items, parent) => {
  items.forEach((item) => {
    let listing = document.createElement('option');
    listing.innerHTML = item.name;
    parent.append(listing);
  });
};

//pass IDs as strings
const addToItin = (select, parent) =>  {
  let selected = document.getElementById(select);
  let parentNode = document.getElementById(parent);
  let item = document.createElement('li');
  item.innerHTML = selected.value;
  parentNode.append(item);
};

fetch('/api')
  .then(data => data.json())
  .then(jsonData => {
    makeMenus(jsonData[0], hotelList);
    makeMenus(jsonData[1], restaurantList);
    makeMenus(jsonData[2], activityList);
  })
  .catch(console.error);

const hotelButton = document.getElementById('hotels-add');
hotelButton.addEventListener('click', () => {
  addToItin('hotels-choices', 'hotels-list');
});

const restaurantButton = document.getElementById('restaurants-add');
restaurantButton.addEventListener('click', () => {
  addToItin('restaurants-choices', 'restaurants-list');
});

const activityButton = document.getElementById('activities-add');
activityButton.addEventListener('click', () => {
  addToItin('activities-choices', 'activities-list');
});
