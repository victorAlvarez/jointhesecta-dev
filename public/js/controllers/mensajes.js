angular.module('jts.mensajes').controller('MensajesController', ['$scope', '$routeParams', '$location', 'Global', 'Mensajes', function ($scope, $routeParams, $location, Global, Mensajes) {
    $scope.global = Global;

    $scope.create = function() {
        var mensaje = new Mensajes({
            title: this.title,
            content: this.content
        });
        mensaje.$save(function(response) {
            $location.path("mensajes/" + response._id);
        });

        this.title = "";
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

    $scope.findOne = function() {
        Mensajes.get({
            mensajeId: $routeParams.mensajeId
        }, function(mensaje) {
            $scope.mensaje = mensaje;
        });
    };
}]);