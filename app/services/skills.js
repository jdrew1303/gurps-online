/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('SkillsService', function ($http, $q, $resource, global) {
    var self = this;
    var serviceUri = global.api_dev + "/skills";
    var SkillsResource = $resource(serviceUri, {}, {
        skillId: '@id',
        skillName: '@name',
        all: {
            method: "GET",
            url: serviceUri + "/",
            isArray: true
        },
        find: {
            method: "GET",
            url: serviceUri + "/:skillId",
        },
        find_by_name: {
            method: "GET",
            url: serviceUri + "/name/:skillName",
        },
    });

    this.all = function () {
        var deferred = $q.defer();
        SkillsResource.all().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    this.get = function (skillId) {
        var deferred = $q.defer();
        SkillsResource.find({skillId: skillId}).$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    this.by_name = function (skillName) {
        var deferred = $q.defer();
        SkillsResource.find_by_name({skillName: skillName}).$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    return this;

});