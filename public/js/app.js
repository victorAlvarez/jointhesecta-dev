window.app = angular.module('jts', ['ngCookies', 'ngResource', 'ngAnimate', 'ngRoute', 'ui.bootstrap', 'jts.system',
    'jts.socket' ,'jts.mensajes', 'jts.chat', 'jts.posit', 'jts.graphic', 'jts.toaster', 'jts.users', 'jts.directives']);
console.log("windows.app = jts")
angular.module('jts.system', []);
angular.module('jts.mensajes', []);
angular.module('jts.users', []);
angular.module('jts.socket', []);
angular.module('jts.chat', []);
angular.module('jts.posit', []);
angular.module('jts.graphic', []);
angular.module('jts.toaster', []);