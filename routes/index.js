const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const models = require('../models');

router.get('/api', (req, res, next) => {
  Promise.all([
    models.Hotel.findAll({include: {all: true}}),
    models.Restaurant.findAll({include: {all: true}}),
    models.Activity.findAll({include: {all: true}})
  ])
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;

