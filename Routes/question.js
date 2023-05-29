const express = require('express');
const questionController = require('../Controllers/question');

const route = express.Router();

route.get('/', questionController.GetAll);

route.get('/iso/:id', questionController.GetISO);

route.get('/:id', questionController.FindById);

route.put('/:id', questionController.Update);

route.delete('/:id', questionController.Delete);

route.post('/add', questionController.Add);

module.exports = route