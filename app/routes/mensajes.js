'use strict';

// Articles routes use articles controller
var mensajes = require('../controllers/mensajes');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.mensajes.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/mensajes', authorization.requiresLogin, mensajes.all);
    app.post('/mensajes', authorization.requiresLogin, mensajes.create);
    app.get('/mensajes/:mensajeId', mensajes.show);
    app.get('/mensajes/:contarMensajes', mensajes.userMessage);
    app.get('/mismensajes/:receptor', mensajes.mis);
    app.put('/mensajes/:mensajeId', authorization.requiresLogin, hasAuthorization, mensajes.update);
    app.del('/mensajes/:mensajeId', authorization.requiresLogin, hasAuthorization, mensajes.destroy);

    // Finish with setting up the articleId param
    app.param('mensajeId', mensajes.mensaje);

};