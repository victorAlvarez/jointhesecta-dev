
module.exports = function (app, server) {
    console.log('socket.io: var io = require');
    var io = require('socket.io').listen(server, { log: false });
    global.io = io;
    global.chat = {};
    global.posit = {};

    io.of('/modulos/chat').on('connection', function (socket) {
        console.log('**********************');
        console.log('Socket. on connection in chat:');

        socket.on('addUserChat', function (user) {
            console.log('Usuario en servidor CHAT socket.io:');
            console.log('Se ha conectado:');
            for(var client in io.of('/modulos/chat').clients()) {
                console.log(io.of('/modulos/chat').clients()[client].id + ' disconnected: ' + io.of('/modulos/chat').clients()[client].disconnected)
            }

            console.log('**********************');
            console.log(user);
            global.chat[user._id] = socket;
            console.log('usuarios conectados en chat:' + io.of('/modulos/chat').clients().length);
        });
    });

    io.of('/modulos/posit').on('connection', function (socket) {
        console.log('**********************');
        console.log('Socket. on connection in posit:');

        socket.on('addUserPosit', function (user) {
            console.log('Usuario en servidor POSIT socket.io:');
            console.log('Se ha conectado:');
            for(var client in io.of('/modulos/posit').clients()) {
                console.log(io.of('/modulos/posit').clients()[client].id + ' disconnected: ' + io.of('/modulos/posit').clients()[client].disconnected)
            }
            console.log('usuarios conectados en posit:' + io.of('/modulos/posit').clients().length);
            console.log('**********************');
            console.log(user);
            global.posit[user._id] = socket;
            console.log('**********************');
        });
    });

    io.of('/modulos/graphic').on('connection', function (socket) {
        console.log('**********************');
        console.log('Socket. on connection in graphic:');

        socket.on('disconnect', function () {
            console.log('Hasta Luego!');
        });
    });
};