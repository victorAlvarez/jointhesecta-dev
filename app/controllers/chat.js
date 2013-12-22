    var names = {};

    var getUsers = function () {
        var res = [];
        for (user in global.usuarios) {
            res.push(user);
        }
        return res;
    };

exports.iniciar = function (req, res) {
    console.log("Entramos iniciar");
    var io = global.io;
    var name = req.user.name;
    var _id =  req.user._id;
    var socketid = global.usuarios[_id];
    /**
    io.socket.on('adduser', function (user) {
        console.log('Usuario en module.chat:');
        console.log(user);
      // console.log('usuarios: %j' + JSON.stringify(usuarios, null, 2));
      //  socket.username = username;
      //  usuarios[username] = username;
      //  socket.join(username);
    });
    **/

    // send the new user their name and a list of users
    socketid.emit('init', {
        name: name,
        users: getUsers()
    });

    // notify other clients that a new user has joined
    io.sockets.emit('user:join', {
        name: name,
        users: getUsers()
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
        socketid.broadcast.emit('user:left', {
            name: name
        });
        if (global.usuarios[_id]) {
            delete global.usuarios[_id];
        }
    });
};