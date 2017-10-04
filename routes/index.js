const promise = require('bluebird');
const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/api', (req,res,next) =>{
  const attractions = {};

  const place = models.Place.findAll();

  const restaurant = models.Restaurant.findAll({ include: [{all:true}]})
  const hotel = models.Hotel.findAll({ include: [{all:true}]});
  const activity = models.Activity.findAll({ include: [{all:true}]});

  promise.all([hotel,restaurant,activity])
  .then(all => {
    attractions.hotels = all[0];
    attractions.restaurants = all[1];
    attractions.activities = all[2];
    res.json(attractions);
  })
  .catch(next);


})



module.exports=router;


