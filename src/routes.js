const { Router } = require('express');

const ContactController = require('./app/Controllers/ContactController');

const routes = new Router();

routes.get('/contatos', ContactController.getAll);
routes.post('/cadastrar', ContactController.create);
routes.put('/atualizar', ContactController.update);

module.exports = routes;