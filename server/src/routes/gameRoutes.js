const express = require('express');
const Router = express.Router();
const { getGameData } = require('../controllers/gameController');


// Example route for fetching game data
Router.get('/', getGameData);

module.exports = Router;