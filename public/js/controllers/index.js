angular.module('jts.system').controller('IndexController', ['$scope', 'Global', 'socket',
    function ($scope, Global, socket) {
        $scope.global = Global;
    }]);