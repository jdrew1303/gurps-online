/**
 * Created by lelabo on 14/06/17.
 */
angular.module('gurps-online').directive('secondaryAttributes', function ($timeout, $mdDialog) {
    return {
        scope: {
            placeholder: "@",
            info: "@",
            variable: "=",
        },
        templateUrl: "directives/secondary-attributes/secondary-attributes.html",
        restrict: 'E',
        link: function($scope, $element) {
            $scope.showInfo = function (template, ev) {
                $mdDialog.show({
                    controller: InfoController,
                    templateUrl: template,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    targetEvent: ev
                });
            };
        }
    };
});

function InfoController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}