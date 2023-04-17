const express = require('express');

const UserController = require('../Controllers/user');

const route = express.Router();

route.get('/', UserController.Example);

route.post('/register', UserController.Register);

module.exports = route