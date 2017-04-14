/**
 * Created by lelabo on 13/04/17.
 */
angular.module('gurps-online').factory('Storage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key) {
            return $window.localStorage[key] || null;
        },
        removeItem: function (key) {
            $window.localStorage.removeItem(key);
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            var obj = $window.localStorage[key] || null;
            if (obj != null) {
                obj = JSON.parse(obj);
            }
            return obj;
        }
    }
}]);