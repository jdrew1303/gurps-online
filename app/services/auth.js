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

        test: {
            method: "GET",
            url: serviceUri + "/",
            isArray: true
        }
    });

    this.login = function (myusername, mypassword) {
        var deferred = $q.defer();
        AuthResource.login({username: myusername, password: mypassword}).$promise
            .then(function (resp) {
                Storage.set('token', resp.token);
                console.log(resp);
                AuthResource.test().$promise
                    .then(function (resp) {
                        console.log(resp);
                    }, deferred.reject);
                // if (!data || !data.hasOwnProperty("token")) {
                //     deferred.reject(data);
                // } else {
                //     Api.setToken(data.token);
                //     deferred.resolve(data);
                // }
            }, deferred.reject);
        return deferred.promise;
    };
    // this.logout = function () {
    //     OauthService.logout();
    //     Storage.removeItem("userToken");
    //     UserService.reset();
    //     FidelisService.reset();
    //     $state.go('login');
    // };
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