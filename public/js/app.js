window.app = angular.module('jts', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'jts.system', 'jts.socket' ,'jts.mensajes', 'jts.chat', 'jts.posit', 'jts.users', 'jts.directives']);
console.log("windows.app = jts")
angular.module('jts.system', []);
angular.module('jts.mensajes', []);
angular.module('jts.users', []);
angular.module('jts.socket', []);
angular.module('jts.chat', []);
angular.module('jts.posit', []);