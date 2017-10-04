const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const models = require('../models');
const routes = require('../routes');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('dev'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.send('Something went wrong' + err.message);
});

const port = 3000;

app.use('/',routes);

app.listen(port, () => {
  console.log('listening on hyunjoo 3000');

  models.db.sync()
    .then(() => {
      console.log('synced database');
    }).catch((err) => console.error('Something is broke.', err, err.stack));
});

