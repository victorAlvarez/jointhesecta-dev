angular.module('jts.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    console.log("jts.system --> controller(HeaderController)");
    $scope.global = Global;

    $scope.menu = [
        {
            "title": "Modulos",
            "link": "modules",
            "subMenu": [
                {
                    title: "Chat",
                    link: "modulos/chat"
                },
                {
                    title: "Posit",
                    link: "modulos/posit"
                },
                {
                    title: "Graphic",
                    link: "modulos/graphic"
                }
            ]
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


    /*
     if ($scope.global.user != null) {

     $scope.countMesssage = function () {
     Mensajes.get({
     mensajeId: $routeParams.mensajeId
     }, function(mensaje) {
     $scope.mensaje = mensaje;
     });
     }

     // socket.emit('userMessage', {id: $scope.global.user._id});

     socket.on('countMessage', function (data) {
     $scope.countMessage = data.mensaje;
     console.log('header');
     });

     }
     */
    $scope.isCollapsed = false;
}]);