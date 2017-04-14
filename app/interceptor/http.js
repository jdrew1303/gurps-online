/**
 * Created by lelabo on 14/04/17.
 */
angular.module('gurps-online').factory('HttpInterceptor', function (Storage, $injector, $rootScope, $q) {
    function goToLogin() {
        $injector.get('$state').go('login');
    }
    function catch401(request) {
        if (request.status === 401) {
            goToLogin();
        }
    }
    function catchNoConnection(request) {
        if (request.status <= 0) {
            goToLogin();
        }
    }
    return {
        'request': function (config) {
            var token = Storage.get('token');
            console.log(token);
            if (token) {
                config.headers["x-access-token"] = Storage.get('token');
            }
            config.timeout = 10000;
            return config || $q.when(config);
        },
        'response': function (response) {
            $rootScope.$broadcast('loading:hide');
            catch401(response);
            catchNoConnection(response);
            return response;
        },
        'responseError': function (error) {
            $rootScope.$broadcast('loading:hide');
            catch401(error);
            catchNoConnection(error);
            return error;
        }
    };
});