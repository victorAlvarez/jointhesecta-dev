//Setting up route
window.app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/mensajes', {
                templateUrl: 'views/mensajes/list.html'
            }).
            when('/mensajes/:receptor/mis', {
                templateUrl: 'views/mensajes/mis.html'
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
            when('/contact', {
                templateUrl: 'views/contact.html'
            }).
            when('/modules', {
                templateUrl: 'views/modules.html'
            }).
            when('/modules/chat', {
                templateUrl: 'views/modulos/chat.html'
            }).
            when('/hosting', {
                templateUrl: 'views/hosting.html'
            }).
            when('/phylosofy', {
                templateUrl: 'views/phylosofy.html'
            }).
            when('/whoweare', {
                templateUrl: 'views/whoweare.html'
            }).
            when('/modulos/chat', {
                templateUrl: 'views/modulos/chat.html'
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
    function ($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);