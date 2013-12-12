window.app = angular.module('jts', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'jts.system', 'jts.mensajes', 'jts.users', 'jts.socket', 'jts.directives']);

angular.module('jts.system', []);
angular.module('jts.mensajes', []);
angular.module('jts.users', []);
angular.module('jts.socket', []);