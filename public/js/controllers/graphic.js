/**
 * Created by Victor-BookPro on 30/12/13.
 */

angular.module('jts.chat').controller('GraphicController', ['$scope', '$http', '$routeParams', '$location', 'Global', function ($scope, $http, $routeParams, $location, Global) {

    $scope.disableVote = false;

    var cargar = false;

    if (cargar == false) {
        console.log('Conexión a namespace Graphic');
        var socket = io.connect('/modulos/graphic', {'force new connection' : true});
        angular.element(document).ready(function () {
            $http.get('/graphic').success(function(data) {
                $scope.graphics = data;
            });
            cargar = true;
        });
    }

    $scope.vote = function(graphic) {
        graphic.votes = graphic.votes + 1;
        $http.put('/graphic/' + graphic._id, graphic).success(function(data) {
            $scope.disableVote = true;
        });
    };


    socket.on('graphic:updated', function (graphic) {
        $http.get('/graphics').success(function(data) {
            $scope.graphic = data;
        });
        $.pnotify({title: 'Vote', text: '+1 vote for ' + graphic.name });
    });

    $scope.$on('$destroy', function (event) {
        socket.disconnect();
    });

}]);
