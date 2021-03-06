const express = require('express');

const RepController = require('./controllers/RepController');

const routes = express.Router();

routes.get('/repositories/:language', RepController.index);

module.exports = routes;