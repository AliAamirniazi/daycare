var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
const cors = require('cors')
require('dotenv').config();
const path = require("path"); // on top\
// cross origin 
app.use(cors())

//user routes
app.use('/api/users', require('./routes/api/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}!`);
});