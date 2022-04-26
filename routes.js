const express = require('express');
const { loginRequired } = require('./src/middlewares/middleware');

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const route = express.Router();

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/logar', loginController.logar);
route.get('/login/sair', loginController.sair);

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex); // parametro de URL
route.post('/contato/edit/:id', loginRequired, contatoController.edit); 
route.get('/contato/delete/:id', loginRequired, contatoController.delete); 

module.exports = route;
