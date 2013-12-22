var connected = false;

angular.module('jts.socket').factory('socket', function ($rootScope) {
    console.log("jts.socket --> factory(socket)")

    if(connected){
        console.log('Petición socket!')
    }else{
        console.log('Primera conexion!');
        var socket = io.connect();
        socket.emit('addUser', window.user);
        connected = true;
    }

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
});