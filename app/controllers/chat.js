    var names = {};

    var claim = function (name) {
        if (!name || userNames[name]) {
            return false;
        } else {
            userNames[name] = true;
            return true;
        }
    };

    var getUsers = function () {
        var res = [];
        for (user in names) {
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
    io.sockets.socket(socketid).emit('init', {
        name: name,
        users: getUsers()
    });

    // notify other clients that a new user has joined
    io.sockets.emit('user:join', {
        name: name
    });

    // broadcast a user's message to other users
    io.sockets.socket(socketid).on('send:message', function (data) {
        io.sockets.socket(socketid).broadcast.emit('send:message', {
            user: name,
            text: data.message
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    io.sockets.socket(socketid).on('disconnect', function () {
        io.sockets.socket(socketid).broadcast.emit('user:left', {
            name: name
        });
        if (names[name]) {
            delete names[name];
        }
    });
};