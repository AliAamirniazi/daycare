var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ extended: false, limit: '50mb' }));
const cors = require('cors');
const connectDB = require('./config/db')
require('dotenv').config();
const path = require("path");
// cross origin 
app.use(cors())

// Connect Database
connectDB();
//user routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}!`);
});