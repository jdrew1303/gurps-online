/**
 * Created by lelabo on 14/06/17.
 */
angular.module('gurps-online').directive('attributesSelector', function ($timeout, $mdDialog) {
    return {
        scope: {
            placeholder: "@",
            info: "@",
            states: "=",
            edit: "=",
            capital: "=",
            change: "=",
            indexer: "=",
        },
        templateUrl: "directives/attributes-selector/attributes-selector.html",
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

            $scope.changeFunction = function (old, item) {
                if ($scope.change) {
                    $scope.change(old, item);
                }
            };

            $scope.indexFunction = function () {
                if ($scope.indexer) {
                    return $scope.indexer();
                }
                return 0;
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