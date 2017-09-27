/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('DisdvantagesService', function ($http, $q, $resource, global) {
    var self = this;
    var serviceUri = global.api_dev + "/disadvantages";
    var DisadvantagesResource = $resource(serviceUri, {}, {
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
        DisadvantagesResource.all().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    this.get = function (objectId) {
        var deferred = $q.defer();
        DisadvantagesResource.find({objectId: objectId}).$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    this.by_name = function (objectName) {
        var deferred = $q.defer();
        DisadvantagesResource.find_by_name({objectName: objectName}).$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    return this;

});