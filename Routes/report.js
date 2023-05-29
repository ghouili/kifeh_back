const express = require('express');
const reportController = require('../Controllers/report');

const route = express.Router();

route.get('/', reportController.GetAll);

route.get('/:isoid/:userid', reportController.generatePDF);


module.exports = route