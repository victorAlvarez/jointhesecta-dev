angular.module('jts.chat').controller('ChatController', ['$scope', '$http', '$routeParams', '$location', 'Global', function ($scope, $http, $routeParams, $location, Global) {
    $scope.global = Global;
    $scope.messages = [];
    var cargar = false;

    if (cargar == false) {
        console.log('Conexión a namespace CHAT');
        var socket = io.connect('/modulos/chat', {'force new connection' : true});
        angular.element(document).ready(function () {
            socket.emit('addUserChat', window.user);
            $http.get('/chat').success(function (data) {
                //$scope.name = data
                console.log(data);
            });
            cargar = true;
        });
    }

    socket.on('connect', function () {
        console.log("on connect jts.chat");
        // socket.emit('adduser', $scope.global.user);
    });

    $scope.$on('$destroy', function (event) {
        socket.disconnect();
    });

    socket.on('init', function (data) {
        $scope.$apply(function() {
            console.log("Entramos init");
            $scope.name = data.name;
            $scope.users = data.users;
        });
    });

    socket.on('send:message', function (message) {
        $scope.$apply(function() {
            $scope.messages.push(message);
        });
    });

    socket.on('user:join', function (data) {
        $scope.$apply(function () {
            console.log("Entramos user:join");
            console.log("usuario join:" + data.name);
            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + data.name + ' has joined.'
            });
            $scope.users = data.users;
        });
    });

    // add a message to the conversation when a user disconnects or leaves the room
    socket.on('user:left', function (data) {
        $scope.$apply(function () {
            $scope.messages.push({
                user: 'chatroom',
                text: 'User ' + data.name + ' has left.'
            });
            $scope.users = data.users;
        });
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

    /**
     *
     $scope.iniciar = function(){
        console.log('scope.iniciar!!')
        $http.get('/chat').success(function (data) {

            console.log('get /chat');
            $scope.name = data;
            alert("OK");
        });
    };
     *
     */

}]);