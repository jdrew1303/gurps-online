/**
 * Created by lelabo on 07/04/17.
 */
angular.module('gurps-online').controller('loginCtrl', function($scope, $mdDialog, $state, AuthService, UserService) {
    $scope.user = {
        username: "",
        password: ""
    };

    $scope.login = function (data) {
        AuthService.login(data.username, data.password)
            .then(function (success) {
                $state.go('app');
            },
            function (error) {
                console.log(error)
            });
    };

    $scope.showRegister = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/login/register.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            targetEvent: ev
        }).then(function(answer) {
           AuthService.register(answer.username, answer.password, answer.email)
               .then(function (success) {
                   $scope.login(answer);
               },
               function (error) {
                   console.log(error)
               });
        });
    };
});

function DialogController($scope, $mdDialog) {
    $scope.user = {
        username: "",
        email: "",
        password: ""
    };

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.register = function(answer) {
        $mdDialog.hide(answer);
    };
}