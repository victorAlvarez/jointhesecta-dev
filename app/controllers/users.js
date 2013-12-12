/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var clients = {};
/**
 * Auth callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function (req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function (req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function (req, res) {
    var socketIO = global.socketIO;
    socketIO.emit('adduser', {id: req.user._id});
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function (req, res) {
    var user = new User(req.body);

    user.provider = 'local';
    user.save(function (err) {
        if (err) {
            return res.render('users/signup', {
                errors: err.errors,
                user: user
            });
        }
        req.logIn(user, function (err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 *  Show profile
 */
exports.show = function (req, res) {
    var user = req.profile;

    res.render('users/show', {
        title: user.name,
        user: user
    });
};

/**
 * Send User
 */
exports.me = function (req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function (req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function (err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

exports.validate2 = function (req, res, next) {

    User.findOne({email: req.params.email})
        .exec(function (err, email) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                var email = email;
                if (email == null) {
                    email = {'email' : null};
                    res.jsonp(email);
                } else {
                    res.jsonp(email);
                }
            }
        });

};

exports.searchEmail = function (req, res, next) {

    User.find({email: /.* req.params.email .*/}, {email: 1})
        .exec(function (err, email) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(email);
            }
        });
}

exports.obtenerEmail = function (req, res, next, id) {
    User
        .findOne({
            email: id
        })
        .exec(function (err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

exports.probando = function (req, res, next, id) {
    req.io.emit('get-feelings');
};