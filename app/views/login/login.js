/**
 * Created by lelabo on 07/04/17.
 */
angular.module('gurps-online').controller('loginCtrl', function($scope, $mdDialog) {
    $scope.user = {
        email: "",
        password: ""
    };

    $scope.login = function (data) {
         console.log(data);
    };

    $scope.showRegister = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/login/register.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            targetEvent: ev
        }).then(function(answer) {
            console.log(answer);
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