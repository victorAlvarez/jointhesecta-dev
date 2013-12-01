//Mensajes service used for mensajes REST endpoint
angular.module('jts.mensajes').factory("Mensajes", ['$resource', function ($resource) {
    return $resource(
        'mensajes/:mensajeId',
        {
            mensajeId: '@_id'
        },
        {
            update: {
                method: 'PUT'
            }
        });
}]);