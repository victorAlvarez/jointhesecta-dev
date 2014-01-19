var connected = false;
angular.module('jts.socket').factory('socket', function ($rootScope) {
    console.log("jts.socket --> factory(socket)")

    var socket = io.connect('http://148.251.21.152:3000', {'force new connection' : true});
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };

    /*if(connected){
        console.log('Petición socket!');
    }else{
        console.log('Primera conexion!');
        var socket = io.connect('/modulos/chat', {'force new connection' : true});
        socket.emit('addUser', window.user);
        connected = true;
    }

    if ($location.path() == "/modulos/chat") {
        console.log('Conexión a namespace CHAT');
        var socketChat = io.connect('/modulos/chat', {'force new connection' : true});
        return {
            on: function (eventName, callback) {
                socketChat.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socketChat, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socketChat.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socketChat, args);
                        }
                    });
                })
            },
            disconnect: function () {
                socketChat.disconnect();
            }
        };
        connected = true;
    } else if($location.path() == "/modulos/posit") {
        console.log('Conexión a namespace POSIT');
        var socketPosit = io.connect('/modulos/posit', {'force new connection' : true});
        //socket.emit('addUserPosit', window.user);
        connected = true;
        return {
            on: function (eventName, callback) {
                socketPosit.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socketPosit, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socketPosit.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socketPosit, args);
                        }
                    });
                })
            },
            disconnect: function () {
                socketPosit.disconnect();
            }
        };
    }*/
});