const express = require('express');
const Router = express.Router();


// Example route for fetching game data
Router.get('/', (req, res) => {
    res.send('Game data');
});

module.exports = Router;