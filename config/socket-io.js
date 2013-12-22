
module.exports = function (app, server) {
    console.log('socket.io: var io = require');
    var io = require('socket.io').listen(server, { log: false });
    global.io = io;
    global.usuarios = [];

    io.sockets.on('connection', function (socket) {
        console.log('Socket. on connection:');
        // console.log(socket);
        socket.on('addUser', function (user) {
            console.log('Usuario en servidor socket.io:');
            console.log('Se ha conectado:');
            console.log('**********************');
            console.log(user);

            //console.log('usuarios: %j' + JSON.stringify(usuarios, null, 2));
            // socket.username = username;
            global.usuarios[user._id] = socket;
            //socket.join(username);
            console.log('**********************');
            //console.log('USUARIOS:');
            //console.log(global.usuarios);
            //console.log('**********************');
        });
    });
};