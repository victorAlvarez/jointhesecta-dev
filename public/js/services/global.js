'use strict';

angular.module('jts.system').factory("Global", [function() {
    console.log("jts.system --> factory(Global)");
    var _this = this;
    _this._data = {
        user: window.user,
        authenticated: !! window.user
    };

    return _this._data;
}]);