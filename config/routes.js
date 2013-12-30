module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Email o password incorrectos.'
    }), users.session);

    /*app.get('/users/session2', function (req, res) {
        req.io.route('session2');
    })*/

    //app.io.route('session2', users.session2);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);
    app.get('/usuario/:email', users.validate2);
    app.get('/receptor/:buscarEmail', users.searchEmail);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    //app.io.route('probando', users.probando);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Mensaje Routes
    var mensajes = require('../app/controllers/mensajes');
    app.get('/mensajes', auth.requiresLogin, mensajes.all);
    app.post('/mensajes', auth.requiresLogin, mensajes.create);
    app.get('/mensajes/:mensajeId', mensajes.show);
    app.get('/mensajes/:contarMensajes', mensajes.userMessage);
    app.get('/mismensajes/:receptor', mensajes.mis);
    app.put('/mensajes/:mensajeId', auth.requiresLogin, auth.mensaje.hasAuthorization, mensajes.update);
    app.del('/mensajes/:mensajeId', auth.requiresLogin, auth.mensaje.hasAuthorization, mensajes.destroy);

    //app.io.route('userMessage', mensajes.userMessage, auth.requiresLogin);

    //Finish with setting up the mensajeId param
    app.param('mensajeId', mensajes.mensaje);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

    /** CHAT **/
    var chat = require('../app/controllers/chat');
    app.get('/chat', chat.iniciar);

    //POSIT
    var posit = require('../app/controllers/posit');
    app.get('/posit', posit.iniciarPosit);

    //Graphic
    var graphic = require('../app/controllers/graphics');
    app.get('/graphic', graphic.list);
    app.put('/graphic/:id', graphic.update);

};
