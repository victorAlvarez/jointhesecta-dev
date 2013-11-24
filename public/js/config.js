//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/mensajes', {
            templateUrl: 'views/mensajes/list.html'
        }).
        when('/mensajes/create', {
            templateUrl: 'views/mensajes/create.html'
        }).
        when('/mensajes/:mensajeId/edit', {
            templateUrl: 'views/mensajes/edit.html'
        }).
        when('/mensajes/:mensajeId', {
            templateUrl: 'views/mensajes/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);