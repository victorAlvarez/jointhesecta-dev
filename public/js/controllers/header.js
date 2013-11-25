angular.module('jts.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Modulos",
        "link": "modules"
    }, {
        "title": "Filosofía",
        "link": "phylosofy"
    }, {
        "title": "Hosting",
        "link": "hosting"
    }, {
        "title": "Quiénes somos",
        "link": "whoweare"
    }, {
        "title": "Contactanos",
        "link": "contact"
    }];
    
    $scope.isCollapsed = false;
}]);