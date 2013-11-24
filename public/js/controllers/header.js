angular.module('jts.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Mensajes",
        "link": "mensajes"
    }, {
        "title": "Create New Mensaje",
        "link": "mensajes/create"
    }];
    
    $scope.isCollapsed = false;
}]);