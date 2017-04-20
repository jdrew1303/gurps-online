/**
 * Created by lelabo on 13/04/17.
 */
angular.module('gurps-online').factory('AuthService', function ($http, $q, $resource, global, Storage) {

    var self = this;
    var serviceUri = global.api_dev + "/users";
    var AuthResource = $resource(serviceUri, {}, {
        login: {
            method: "POST",
            url: serviceUri + "/auth",
            headers: {
                'Content-Type': 'application/json'
            }
        },
        register: {
            method: "POST",
            url: serviceUri + "/",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });

    this.login = function (username, password) {
        var deferred = $q.defer();
        AuthResource.login({username: username, password: password}).$promise
            .then(function (resp) {
                if (!resp || !resp.hasOwnProperty("token")) {
                    deferred.reject(resp);
                } else {
                    Storage.set('token', resp.token);
                    deferred.resolve(resp);
                }
            }, deferred.reject);
        return deferred.promise;
    };
    this.logout = function () {
        Storage.set('token', null);
    };
    this.register = function (username, password, email) {
        var deferred = $q.defer();
        AuthResource.register({username: username, password: password, email: email}).$promise
            .then(function (resp) {
                deferred.resolve(resp);
            }, deferred.reject);
        return deferred.promise;
    };
    // this.isConnected = function () {
    //     return Api.getToken() && Api.getToken() !== 'null';
    // };
    // this.aboutConnectedUser = function (force) {
    //     var defer = $q.defer();
    //     if (self.isConnected() === false) {
    //         defer.reject();
    //     } else {
    //         UserService.about(force).then(defer.resolve, function () {
    //             defer.reject();
    //             self.logout();
    //         });
    //     }
    //     return defer.promise;
    // };
    return this;
});