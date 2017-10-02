/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('DamagesService', function ($http, $q, $resource, global) {
    var self = this;
    var serviceUri = global.api_dev + "/damages";
    var DamagesResource = $resource(serviceUri, {}, {
        objectId: '@id',
        objectName: '@name',
        all: {
            method: "GET",
            url: serviceUri + "/",
            isArray: true
        },
        find: {
            method: "GET",
            url: serviceUri + "/:objectId",
        },
        find_by_name: {
            method: "GET",
            url: serviceUri + "/name/:objectName",
        },
    });

    this.all = function () {
        var deferred = $q.defer();
        DamagesResource.all().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    return this;

});