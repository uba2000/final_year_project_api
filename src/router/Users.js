const express = require("express");
const cors = require("cors");

const userController = require('../controllers/userController');

const users = express.Router();

users.use(cors());

users.post('/register', userController.registerUser);

users.post('/login', userController.registerUser);

module.exports = users;