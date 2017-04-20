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
        }
    });

    this.login = function (myusername, mypassword) {
        var deferred = $q.defer();
        AuthResource.login({username: myusername, password: mypassword}).$promise
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
    // this.register = function (user) {
    //     var deferred = $q.defer();
    //     $http.post(Api.getServer() + '/auth/register', user).success(function (data) {
    //         deferred.resolve(data);
    //     }).error(deferred.reject);
    //     return deferred.promise;
    // };
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