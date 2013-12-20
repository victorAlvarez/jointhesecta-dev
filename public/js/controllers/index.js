angular.module('jts.system').controller('IndexController', ['$scope', 'Global',
    function ($scope, Global) {
        console.log("jts.system --> controller(IndexController)");
        $scope.global = Global;
    }
]);