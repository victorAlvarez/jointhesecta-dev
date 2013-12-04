/**
 * Created by Victor-BookPro on 03/12/13.
 */

angular.module('jts.users').factory('Usuario', ['$resource',
    function($resource){
        return $resource('usuario/:email', {}, {
            query: {method:'GET', params:{email:'@email'}, isArray:false}
        });
    }]);