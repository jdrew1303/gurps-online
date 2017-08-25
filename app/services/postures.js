/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('PosturesService', function ($http, $q, $resource, global) {
    var self = this;
    var serviceUri = global.api_dev + "/postures";
    var PosturesResource = $resource(serviceUri, {}, {
        all: {
            method: "GET",
            url: serviceUri + "/",
            isArray: true
        }
    });

    this.all = function () {
        var deferred = $q.defer();
        PosturesResource.all().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };

    return this;

});