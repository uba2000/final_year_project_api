const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Import routes
const Users = require("./src/router/Users");

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Route Middlewares
app.use("/user", Users);

try {
  const port = process.env.PORT || 5000;
  mongoose.connect(process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(_ => {
      console.log('Connected to database (MongoDB)');
      return app.listen(port, () => {
        console.log('Server listening on port ' + port);
      });
    });
} catch (error) {
  console.log("An error occured while connection to mongoDB");
}