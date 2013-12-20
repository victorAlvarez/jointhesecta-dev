global.usuarios = [];

module.exports = function (app, server) {
    var io = require('socket.io').listen(server);
    global.io = io;

    io.sockets.on('connection', function (socket) {
        console.log('Socket. on connection:');
        socket.on('addUser', function(user){
            console.log('Usuario en servidor socket.io:');
            console.log(user._id);
            //console.log('usuarios: %j' + JSON.stringify(usuarios, null, 2));
           // socket.username = username;
            global.usuarios[user._id] = socket;
            //socket.join(username);
        });
    });


}
