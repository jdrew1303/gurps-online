/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('CharactersService', function ($http, $q, $resource, global, UserService) {
    var self = this;
    var serviceUri = global.api_dev + "/characters";
    var CharactersResource = $resource(serviceUri, {}, {
        characterId: '@id',
        create: {
            method: "POST",
            url: serviceUri + "/",
            headers: {
                'Content-Type': 'application/json'
            }
        },
        find: {
            method: "GET",
            url: serviceUri + "/",
            isArray: true
        },
        remove: {
            method: "DELETE",
            url: serviceUri + "/:characterId"
        }
    });

    this.create = function (name, exp) {
        var deferred = $q.defer();
        UserService.me().then(function (user) {
            CharactersResource.create({_owner: user._id, name: name, exp: exp}).$promise
                .then(deferred.resolve, deferred.reject);
        }, function (error) {
            console.log(error);
        });
        return deferred.promise;
    };

    this.userCharacters = function () {
        var deferred = $q.defer();
        CharactersResource.find().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };

    this.remove = function (id) {
        var deferred = $q.defer();
        CharactersResource.remove({characterId: id}).$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };

    return this;

});