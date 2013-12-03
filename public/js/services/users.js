/**
 * Created by Victor-BookPro on 03/12/13.
 */

angular.module('jts.users').factory('Users', ['$resource',
    function($resource){
        return $resource('users/:email/validate2', {}, {
            query: {method:'GET', params:{email:'@email'}, isArray:true}
        });
    }]);