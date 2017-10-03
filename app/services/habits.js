/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('HabitsService', function ($http, $q, $resource, global) {
    var self = this;
    var serviceUri = global.api_dev + "/habits";
    var HabitsResource = $resource(serviceUri, {}, {
        types: {
            method: "GET",
            url: serviceUri + "/types/",
            isArray: true
        }
    });

    this.types = function () {
        var deferred = $q.defer();
        HabitsResource.types().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    return self;

});