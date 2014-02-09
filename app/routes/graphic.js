/**
 * Created by Victor-BookPro on 09/02/14.
 */

'use strict';

// Articles routes use articles controller
var graphic = require('../controllers/graphics');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.graphic.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
    app.get('/graphic', graphic.list);
    app.put('/graphic/:id', graphic.update);
};
