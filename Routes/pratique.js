const express = require('express');
const pratiqueController = require('../Controllers/pratique');

const route = express.Router();

route.get('/', pratiqueController.GetAll);

route.get('/:id', pratiqueController.FindById);

route.put('/:id', pratiqueController.Update);

route.delete('/:id', pratiqueController.Delete);

route.post('/add', pratiqueController.Add);

module.exports = route