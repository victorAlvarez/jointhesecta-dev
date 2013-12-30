/**
 * Created by Victor-BookPro on 30/12/13.
 */

angular.module('jts.graphic').factory("Graphic", ['$resource', function ($resource) {
    console.log("jts.mensajes --> factory(Graphic)")
    return $resource(
        'http://localhost:port/graphics/:id',
        {
            port: ':3000',
            id: '@id'
        },
        {
            'list': {method: 'GET', isArray: true},
            'update': {method: 'PUT'}
        }
    );
}]);