const express = require('express');
const app = express();
const db = require('./db.js');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

// Route setup
const userRoutes = require('./routes/userRoutes.js');
const candidateRoutes = require('./routes/candidateRoute.js');

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

// this both line of code i am using bcz i am deploying it render
app.use(express.static(path.join(__dirname, '/client/dist/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
