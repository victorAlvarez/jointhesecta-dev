angular.module('jts.chat').controller('ChatController', ['$scope', '$http', '$routeParams', '$location', 'Global', 'socket', function ($scope, $http, $routeParams, $location, Global, socket ) {
    $scope.global = Global;
    $scope.messages = [];
    $scope.users = [];

    socket.on('connect', function () {
       console.log("on connect jts.chat");
       // socket.emit('adduser', $scope.global.user);
    });

    socket.on('init', function (data) {
        console.log("Entramos init");
        $scope.name = data.name;
        $scope.users = data.users;
    });

    socket.on('send:message', function (message) {
        $scope.messages.push(message);
    });

    socket.on('user:join', function (data) {
        console.log("Entramos user:join");
        console.log("usuario join:"+data.name);
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has joined.'
        });
        $scope.users.push(data.name);
    });

    // add a message to the conversation when a user disconnects or leaves the room
    socket.on('user:left', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has left.'
        });
        var i, user;
        for (i = 0; i < $scope.users.length; i++) {
            user = $scope.users[i];
            if (user === data.name) {
                $scope.users.splice(i, 1);
                break;
            }
        }
    });

    // Methods published to the scope
    // ==============================

    $scope.sendMessage = function () {
        socket.emit('send:message', {
            message: $scope.message
        });

        // add the message to our model locally
        $scope.messages.push({
            user: $scope.name,
            text: $scope.message
        });

        // clear message box
        $scope.message = '';
    };

    $scope.iniciar = function(){
        $http.get('/chat').success(function (data) {
            $scope.name = data
        });
    };
}]);