angular.module('jts.system').controller('HeaderController', ['$scope', '$http', 'Global', 'Mensajes', 'socket', 'toaster',
    function ($scope, $http, Global, Mensajes, socket, toaster) {
        console.log("jts.system --> controller(HeaderController)");
        $scope.global = Global;
        var cargar = false;

        $scope.menu = [
            {
                "title": "Modulos",
                "link": "modules",
                "subMenu": false
            },
            {
                "title": "Filosofía",
                "link": "phylosofy",
                "subMenu": false
            },
            {
                "title": "Hosting",
                "link": "hosting",
                "subMenu": false
            },
            {
                "title": "Quiénes somos",
                "link": "whoweare",
                "subMenu": false
            },
            {
                "title": "Contactanos",
                "link": "contact",
                "subMenu": false
            }
        ];


        if ($scope.global.user != null) {

            $scope.countMesssage = function () {
                Mensajes.get({
                    mensajeId: $scope.global.user._id
                }, function (mensaje) {
                    $scope.mensaje = mensaje;
                });
            }
            if (cargar == false) {
                console.log('Conexión a socket General');
                angular.element(document).ready(function () {
                    socket.emit('addUser', window.user);


                    cargar = true;
                });
                var id = $scope.global.user._id;

                /*$http.get('/headerNewMensaje/' + id).success(function (data) {

                });*/


                socket.on("compruebaMensajes",function(bandera){
                    if(bandera){
                        $http.get('/checkMessage/' + id).success(function (data) {                   });
                    }
                });

                /*$http.get('/headerMensaje/' + id).success(function (data) {

                });*/
            }

            socket.on('countMessage', function (data) {
                $scope.newClass = false;
                $scope.mensaje = data.mensaje;
                console.log('header');
            });

            socket.on('newMessage', function (data) {
                $http.get('/headerNewMensaje/' + data.id).success(function (data) {

                });
                $http.get('/headerNewMensaje2/' + data.id2).success(function (data) {

                });
            });

            socket.on('newMessage2', function (data) {
                if (data.mensaje == 0) {
                    $http.get('/headerMensaje/' + id).success(function (data) {

                    });
                } else {
                    $scope.newClass = true;
                    $scope.mensaje = data.mensaje;
                }
            });

            socket.on('checkMessage', function (data) {
                if (data.mensaje == 0) {
                    $http.get('/noNewMessage/' + id).success(function (data) {

                    });
                } else {
                    $scope.newClass = true;
                    $scope.mensaje = data.mensaje;
                    toaster.pop('jts', "Bienvenido " + $scope.global.user.username, "Tienes " + data.mensaje + " nuevos mensajes", 5000);
                }
            });

            socket.on('newMessageName', function (data) {
                toaster.pop('jts', "Tienes un nuevo mensaje", data.username.username + " te acaba de enviar un mensaje", 5000);
            });

        }

        $scope.isCollapsed = false;
    }]);