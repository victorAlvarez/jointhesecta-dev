angular.module('jts.mensajes').controller('MensajesController', ['$scope', '$routeParams', '$location', 'Global', 'Mensajes', function ($scope, $routeParams, $location, Global, Mensajes) {
    $scope.global = Global;

    $scope.create = function() {

        console.log("Controller mensajes: create");
        console.log(window.user);

        if(window.user != null){
            console.log("Conectado");
        }else{
            console.log("No conectado");
        }

        var mensaje = new Mensajes({
          //  receptor: this.receptor,
            receptor: "529500e6e14c9f8c17000002",
            title: this.asunto,
            content: this.content
        });

        mensaje.$save(function(response) {
            $location.path("contact");
        });

        $scope.mensaje = 'ok';

        this.asunto = "";
        this.content = "";
    };

    $scope.remove = function(mensaje) {
        mensaje.$remove();

        for (var i in $scope.mensajes) {
            if ($scope.mensajes[i] == mensaje) {
                $scope.mensajes.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var mensaje = $scope.mensaje;
        if (!mensaje.updated) {
            mensaje.updated = [];
        }
        mensaje.updated.push(new Date().getTime());

        mensaje.$update(function() {
            $location.path('mensajes/' + mensaje._id);
        });
    };

    $scope.find = function() {
        Mensajes.query(function(mensajes) {
            $scope.mensajes = mensajes;
        });
    };

    $scope.mis = function() {
        Mensajes.get({
            receptor: $routeParams.receptor
        }, function(mensajes) {
            $scope.mensajes = mensajes;
        });
    };

    $scope.findOne = function() {
        Mensajes.get({
            mensajeId: $routeParams.mensajeId
        }, function(mensaje) {
            $scope.mensaje = mensaje;
        });
    };
}]);