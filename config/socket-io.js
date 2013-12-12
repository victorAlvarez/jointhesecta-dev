/**
 * Created by Victor-BookPro on 12/12/13.
 */

module.exports = function (app, server) {
    var socketIO = require('socket.io').listen(server);

    global.socketIO = socketIO;

    var idusuarios = {};

    socketIO.sockets.on('connection', function (socket) {
        socket.on('adduser', function(username){
            socket.username = username;
            idusuarios[username] = username;
            socket.join(username);

            console.log('usuarios: ' + idusuarios);
        });
    });
}
