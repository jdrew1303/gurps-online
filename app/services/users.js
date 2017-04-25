/**
 * Created by lelabo on 13/04/17.
 */
angular.module('gurps-online').factory('UserService', function ($http, $q, $resource, global, User) {
    var self = this;
    var serviceUri = global.api_dev + "/users";
    var UserResource = $resource(serviceUri, {}, {
        about: {
            method: "GET",
            url: serviceUri + "/me"
        }
    });

    var currentUser = null;
    this.me = function (force) {
        var deferred = $q.defer();
        if (!currentUser || force) {
            UserResource.about().$promise.then(function (resp) {
                currentUser = User.from_response(resp);
                deferred.resolve(currentUser);
            }, deferred.reject);
        } else {
            deferred.resolve(currentUser);
        }
        return deferred.promise;
    };

    this.getCurrentUser = async function () {
      return await self.me();
    };

    return this;
});