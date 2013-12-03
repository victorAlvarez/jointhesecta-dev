angular.module('jts.mensajes').controller('MensajesController', ['$scope', '$routeParams', '$location', 'Global', 'Mensajes','MisMensajes', function ($scope, $routeParams, $location, Global, Mensajes, MisMensajes) {
    $scope.global = Global;

    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    $scope.create = function() {

        console.log("Controller mensajes: create");
        console.log(window.user);

        if(window.user != null){
            console.log("Conectado");
        }else{
            console.log("No conectado");
        }

        var mensaje = new Mensajes({
            receptor: "529c1ab41b225a9019000004",
            asunto: this.asunto,
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
        MisMensajes.query({
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