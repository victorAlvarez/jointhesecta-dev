var usuarios = {};

exports.iniciar = function (req, res) {
    console.log("Entramos iniciar");
    var io = global.io;
    var name = req.user.name;

    var _id =  req.user._id;

    usuarios[_id] = name;
    var socketid = global.chat[_id];

    // send the new user their name and a list of users
    socketid.emit('init', {
        name: name,
        users: usuarios
    });

    // notify other clients that a new user has joined
    io.of('/modulos/chat').emit('user:join', {
        name: name,
        users: usuarios
    });

    // broadcast a user's message to other users
    socketid.on('send:message', function (data) {
        socketid.broadcast.emit('send:message', {
            user: name,
            text: data.message
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    socketid.on('disconnect', function () {
        console.log('desconectado');
        if (global.chat[_id]) {
            console.log('Antes de eliminar el socket: ' + global.chat[_id]);
            delete global.chat[_id];
            console.log('Despues de eliminar el socket: ' + global.chat[_id]);
            delete usuarios[_id];

        }
        socketid.broadcast.emit('user:left', {
            name: name,
            users: usuarios
        });
    });

    res.jsonp('entra');
};

exports.prueba = function(req, res) {
    res.jsonp('prueba');
};