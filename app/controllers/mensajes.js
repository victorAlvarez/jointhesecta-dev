/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Mensaje = mongoose.model('Mensaje'),
    _ = require('underscore'),
    correo = require('../../config/mailer');

/**
 * Find mensaje by id
 */
exports.mensaje = function (req, res, next, id) {
    Mensaje.load(id, function (err, mensaje) {
        if (err) return next(err);
        if (!mensaje) return next(new Error('Failed to load mensaje ' + id));
        req.mensaje = mensaje;
        next();
    });
};

/**
 * Create a mensaje
 */
exports.create = function (req, res) {
    var mensaje = new Mensaje(req.body);
    mensaje.user = req.user;

    var mailOptions = {
        from: req.user.email, // sender address
        to: "Administrador <info@jointhesecta.com>", // list of receivers
        subject: mensaje.asunto, // Subject line
        text: mensaje.content, // plaintext body
        html: "<p>"+mensaje.content+"</p>" // html body
    }

    correo.enviarCorreo(mailOptions);

    mensaje.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                mensaje: mensaje
            });
        } else {
            var iduser = mensaje._id;
            var io = global.io;
            io.sockets.in(iduser).emit('countMessage', {mensaje: mensaje});
            res.jsonp(mensaje);
        }
    });
};

/**
 * Update a mensaje
 */
exports.update = function (req, res) {
    var mensaje = req.mensaje;

    mensaje = _.extend(mensaje, req.body);

    mensaje.save(function (err) {
        res.jsonp(mensaje);
    });
};

/**
 * Delete an mensaje
 */
exports.destroy = function (req, res) {
    var mensaje = req.mensaje;

    mensaje.remove(function (err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(mensaje);
        }
    });
};

/**
 * Show an mensaje
 */
exports.show = function (req, res) {
    res.jsonp(req.mensaje);
};

/**
 * List of mensaje
 */
exports.all = function (req, res) {
    if (req.user == undefined) {
        // 'No puedes ver los mensajes sin acceder'
        return res.send('users/signup', {
            errors: "No puedes ver los mensajes sin acceder"
        });
    } else {
        var user = req.user;
    }

    Mensaje.find().sort('-created').populate('user', 'name username').exec(function (err, mensaje) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(mensaje);
        }
    });
};

/**
 * Listado de mis mensajes
 */
exports.mis = function (req, res) {
    if (req.user == undefined) {
        // 'No puedes ver los mensajes sin acceder'
        return res.send('users/signup', {
            errors: "No puedes ver los mensajes sin acceder"
        });
    } else {
        var user = req.user;
    }

    console.log("{ 'receptor': '" + user._id + "' }");

    Mensaje.find({receptor: user._id }).sort('-created').populate('user', 'name username').exec(function (err, mensaje) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(mensaje);
        }
    });
};

exports.userMessage = function (req, res) {
    Mensaje.find({receptor: req.data.id }).count().exec(function (err, mensaje) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(mensaje);
        }
    });
};