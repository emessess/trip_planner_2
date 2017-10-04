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

// const marker = buildMarker('hotels', [-74.009, 40.705])
// marker.addTo(map)

let hotel = document.getElementById('hotels-choices');
let restaurant = document.getElementById('restaurants-choices');
let activity = document.getElementById('activities-choices');

const hotelInfo = [];
const restaurantInfo = [];
const activityInfo = [];

fetch('/api')
.then(response => {
  return response.json();
})
.then(data => {
  data.hotels.forEach(info => {
    let addHotels = document.createElement('option');
    hotelInfo.push(info);
    addHotels.innerHTML = info.name;
    hotel.append(addHotels);
  })
  data.restaurants.forEach(info => {
    let addRestaurants = document.createElement('option');
    restaurantInfo.push(info);
    addRestaurants.innerHTML = info.name;
    restaurant.append(addRestaurants);
  })
  data.activities.forEach(info => {
    let addActivities = document.createElement('option');
    activityInfo.push(info)
    addActivities.innerHTML = info.name;
    activity.append(addActivities);
  })
})
.catch(console.error)


const selectHotel = document.getElementById(`hotels-choices`);
const hotelList = document.getElementById(`hotels-list`);
const hotelBtn = document.getElementById(`hotels-add`);

const selectRest = document.getElementById(`restaurants-choices`);
const restaurantList = document.getElementById(`restaurants-list`);
const restaurantBtn = document.getElementById(`restaurants-add`);

const selectAct = document.getElementById(`activities-choices`);
const activityList = document.getElementById(`activities-list`);
const activityBtn = document.getElementById(`activities-add`);



hotelBtn.addEventListener("click", () => {
    const selectedId = selectHotel.value;
    const addHotels = document.createElement('li');
    const hotelRemoveBtn = document.createElement(`button`);
    const minus = document.createTextNode(`-`);
    const zoom = document.createElement(`button`);
    const zooooom = document.createTextNode(`zoooom`);

    addHotels.innerHTML = selectedId;
    console.log('HOTELS', selectedId);
    if(selectedId!=='An Hotel'){
      hotelList
        .appendChild(addHotels)
        .appendChild(hotelRemoveBtn)
        .appendChild(minus);
      hotelList
        .appendChild(zoom)
        .appendChild(zooooom)
    } else {
      alert('Choose a hotel!')
    }

    hotelRemoveBtn.onclick = ()=>{
      console.log('DELETING MATT');
      hotelList.removeChild(addHotels);
      hotelList.removeChild(zoom);
    }
    zoom.onclick = () => {
      for(var each in hotelInfo){
        let location = hotelInfo[each].place.location;
        let x = +location[0];
        let y = +location[1];
        console.log(x,y)
        const lala = buildMarker('hotels', [x,y])
        lala.addTo(map)
        map.flyTo({center: [x,y],zoom:15})
      }
    }
});


restaurantBtn.addEventListener("click", () => {
    const selectedId = selectRest.value;
    const addRestaurant = document.createElement('li');
    const restaurantRemoveBtn = document.createElement(`button`);
    const minus = document.createTextNode(`-`);
    const zoom = document.createElement(`button`);
    const zooooom = document.createTextNode(`zoooom`);

    addRestaurant.innerHTML = selectedId;
    console.log('RESTAURANTS', selectedId);

    if(selectedId!=='A Restaurant'){
      restaurantList
        .appendChild(addRestaurant)
        .appendChild(restaurantRemoveBtn)
        .appendChild(minus)
      restaurantList
        .appendChild(zoom)
        .appendChild(zooooom)
      } else {
        alert('Choose a Restaurant MATTTTTEOOO!')
      }

    restaurantRemoveBtn.onclick = () => {
      console.log('DELETE');
      restaurantList.removeChild(addRestaurant);
      restaurantList.removeChild(zoom);
    };

    zoom.onclick = () => {
      for(var each in restaurantInfo){
        let location = restaurantInfo[each].place.location;
        let x = +location[0];
        let y = +location[1];
        console.log(x,y)
        const lala = buildMarker('hotels', [x,y])
        lala.addTo(map)
        map.flyTo({center: [x,y],zoom:15})
      }
    }
});


activityBtn.addEventListener("click", () => {
    const selectedId = selectAct.value;
    const addActivity = document.createElement('li');
    const activityRemoveBtn = document.createElement(`button`);
    const minus = document.createTextNode(`-`);
    const zoom = document.createElement(`button`);
    const zooooom = document.createTextNode(`zoooom`);

    addActivity.innerHTML = selectedId;
    console.log('ACTIVITIES', selectedId);

    if(selectedId !== 'An Activity'){
      activityList
        .appendChild(addActivity)
        .appendChild(activityRemoveBtn)
        .appendChild(minus)
      activityList
        .appendChild(zoom)
        .appendChild(zooooom)

    } else alert('Choose an Activity!!!!!!!!!!!!!!')


    activityRemoveBtn.onclick = ()=>{
      console.log('DELETING MATT')
      activityList.removeChild(addActivity)
      activityList.removeChild(zoom);
    }

     zoom.onclick = () => {
      for(var each in activityInfo){
        let location = activityInfo[each].place.location;
        let x = +location[0];
        let y = +location[1];
        console.log(x,y)
        const lala = buildMarker('hotels', [x,y])
        lala.addTo(map)
        map.flyTo({center: [x,y],zoom:15})
      }
    }
});




// const marker = buildMarker('hotels', [-74.009, 40.705])
// marker.addTo(map)
