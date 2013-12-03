/**
 * Created by Victor-BookPro on 03/12/13.
 */

angular.module('jts.users').factory('Users', ['$resource',
    function($resource){
        return $resource('mismensajes/:receptor', {}, {
            query: {method:'GET', params:{receptor:'@_id'}, isArray:true}
        });
    }]);