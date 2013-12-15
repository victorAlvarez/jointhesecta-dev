/**
 * Created by Victor-BookPro on 12/12/13.
 */

module.exports = function (app, server) {
    var socketIO = require('socket.io').listen(server);

    var idusuarios = {};

    global.io = socketIO;
    io.sockets.on('connection', function (socket) {
        global.socket = socket;

        socket.on('adduser', function(username){
            console.log('usuarios: %j' + JSON.stringify(idusuarios, null, 2));
            socket.username = username;
            idusuarios[username] = username;
            socket.join(username);
        });
    });


}
