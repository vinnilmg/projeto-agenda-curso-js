const express = require('express');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

const route = express.Router();

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/', loginController.index)


module.exports = route;
