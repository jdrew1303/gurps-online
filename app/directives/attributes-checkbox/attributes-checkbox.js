/**
 * Created by lelabo on 14/06/17.
 */
angular.module('gurps-online').directive('attributesCheckbox', function ($timeout, $mdDialog) {
    return {
        scope: {
            placeholder: "@",
            info: "@",
            variable: "=",
            edit: "=",
            capital: "=",
            cost: "=",
        },
        templateUrl: "directives/attributes-checkbox/attributes-checkbox.html",
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

            $scope.variableChange = function(toggle) {
                if (toggle) {
                    if ($scope.capital >= $scope.cost) {
                        $scope.capital -= $scope.cost;
                    } else {
                        $scope.variable = false;
                    }
                } else {
                    $scope.capital += $scope.cost;
                }
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