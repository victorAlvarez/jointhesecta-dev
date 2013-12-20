var userNames = (function () {
    var names = {};

    var claim = function (name) {
        if (!name || userNames[name]) {
            return false;
        } else {
            userNames[name] = true;
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    var getGuestName = function () {
        var name,
            nextUserId = 1;
        do {
            name = 'Guest ' + nextUserId;
            nextUserId += 1;
        } while (!claim(name));
        return name;
    };

    // serialize claimed names as an array
    var get = function () {
        var res = [];
        for (user in userNames) {
            res.push(user);
        }
        return res;
    };

    var free = function (name) {
        if (userNames[name]) {
            delete userNames[name];
        }
    };

    return {
        claim: claim,
        free: free,
        get: get,
        getGuestName: getGuestName
    };
}());

exports.chat = function (req, res) {
    console.log("Renderizamos chat");
    res.render('chat/chat', {
        title: 'CHAT'
    });
};

exports.iniciar = function (req, res) {
    console.log("Entramos iniciar");
    var io = global.io;
    var name = req.user.name;
    var _id =  req.user._id;

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
    global.usuarios[_id].emit('init', {
        name: name,
        users: userNames.get()
    });

    // notify other clients that a new user has joined
    io.sockets.emit('user:join', {
        name: name
    });

    // broadcast a user's message to other users
    global.usuarios[_id].on('send:message', function (data) {
        global.usuarios[_id].broadcast.emit('send:message', {
            user: name,
            text: data.message
        });
    });

    // validate a user's name change, and broadcast it on success
    global.usuarios[_id].on('change:name', function (data, fn) {
        if (userNames.claim(data.name)) {
            var oldName = name;
            userNames.free(oldName);

            name = data.name;

            global.usuarios[_id].broadcast.emit('change:name', {
                oldName: oldName,
                newName: name
            });

            fn(true);
        } else {
            fn(false);
        }
    });

    // clean up when a user leaves, and broadcast it to other users
    global.usuarios[_id].on('disconnect', function () {
        global.usuarios[_id].broadcast.emit('user:left', {
            name: name
        });
        userNames.free(name);
    });
};