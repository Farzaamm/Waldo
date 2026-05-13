const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const gameRoutes = require('./routes/gameRoutes');
const scoresRoutes = require('./routes/scoresRoutes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Waldo API!');
});

app.use('/api/games', gameRoutes);
app.use('/api/scores', scoresRoutes);   

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});