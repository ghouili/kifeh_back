const express = require('express');
const isoController = require('../Controllers/iso');

const route = express.Router();

route.get('/', isoController.GetAll);

route.get('/:id', isoController.FindById);

route.put('/:id', isoController.Update);

route.delete('/:id', isoController.Delete);

route.post('/add', isoController.Add);

module.exports = route