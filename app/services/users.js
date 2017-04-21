/**
 * Created by lelabo on 13/04/17.
 */
angular.module('gurps-online').factory('UserService', function ($http, $q, $resource, global, Storage) {
    var self = this;
    var serviceUri = global.api_dev + "/users";
    var UserResource = $resource(serviceUri, {}, {
        about: {
            method: "GET",
            url: serviceUri + "/me"
        }
    });
    this.about = function () {
        var deferred = $q.defer();
        UserResource.about().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    return this;
});