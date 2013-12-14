
// Keep track of which names are used so that there are no duplicates
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

 exports.chat = function(req, res){
     console.log("Renderizamos chat");
     res.render('chat/chat',{
         title: 'CHAT'
     });
 };

exports.iniciar = function(req, res) {
    console.log("Entramos iniciar");
    var socketIO = global.socketIO;
    var name = userNames.getGuestName();

    console.log("Nombre: " + name);

    // send the new user their name and a list of users
    socketIO.emit('init', {
        name: name,
        users: userNames.get()
    });

    // notify other clients that a new user has joined
    // socketIO.broadcast.emit('user:join', {
    socketIO.sockets.emit('user:join', {
        name: name
    });

    // broadcast a user's message to other users
    socketIO.on('send:message', function (data) {
        console.log("Entramos send:message");
        socketIO.sockets.emit('send:message', {
        //socketIO.broadcast.emit('send:message', {
            user: name,
            text: data.message
        });
    });

    // validate a user's name change, and broadcast it on success
    socketIO.on('change:name', function (data, fn) {
        if (userNames.claim(data.name)) {
            var oldName = name;
            userNames.free(oldName);

            name = data.name;

            //socketIO.broadcast.emit('change:name', {
            socketIO.sockets.emit('change:name', {
                oldName: oldName,
                newName: name
            });

            fn(true);
        } else {
            fn(false);
        }
    });

    // clean up when a user leaves, and broadcast it to other users
    socketIO.on('disconnect', function () {
        //socketIO.broadcast.emit('user:left', {
        socketIO.sockets.emit('user:left', {
            name: name
        });
        userNames.free(name);
    });
};