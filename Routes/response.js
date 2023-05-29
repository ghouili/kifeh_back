const express = require('express');
const responseController = require('../Controllers/response');

const route = express.Router();

route.get('/', responseController.GetAll);

route.get('/user/:id', responseController.GetUser);

route.get('/:id', responseController.FindById);

route.put('/:id', responseController.Update);

route.delete('/:id', responseController.Delete);

route.post('/add', responseController.Add);

module.exports = route