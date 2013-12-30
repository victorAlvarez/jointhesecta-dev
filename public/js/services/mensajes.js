//Mensajes service used for mensajes REST endpoint
angular.module('jts.mensajes').factory("Mensajes", ['$resource', function ($resource) {
    console.log("jts.mensajes --> factory(Mensajes)")
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

angular.module('jts.mensajes').factory("MisMensajes", ['$resource',
    function($resource){
        return $resource('mismensajes/:receptor', {}, {
            query: {method:'GET', params:{receptor:'@_id'}, isArray:true}
        });
}]);

