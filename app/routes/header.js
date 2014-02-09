/**
 * Created by Victor-BookPro on 09/02/14.
 */

'use strict';

// Articles routes use articles controller
var mensajes = require('../controllers/mensajes');
var users = require('../controllers/users');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.mensajes.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
    app.get('/headerMensaje/:id', mensajes.userMessage);
    app.get('/headerNewMensaje/:id', mensajes.userNewMessage);
    app.get('/headerNewMensaje2/:id', users.obtenerNombre);
    app.get('/checkMessage/:id', mensajes.checkMessage);
    app.get('/noNewMessage/:id', mensajes.noNewMessage);
};
