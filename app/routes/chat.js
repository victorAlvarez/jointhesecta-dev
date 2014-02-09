/**
 * Created by Victor-BookPro on 09/02/14.
 */

'use strict';

// Articles routes use articles controller
var chat = require('../controllers/chat');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.chat.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
    app.get('/chat', chat.iniciar);
};
