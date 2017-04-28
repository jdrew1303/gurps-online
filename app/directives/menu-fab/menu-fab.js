/**
 * Created by lelabo on 28/04/17.
 */
angular.module('gurps-online').directive('sideMenuFab', function ($timeout) {
    return {
        scope: {
            canDelete: "=",
            onClickNew: "="
        },
        templateUrl: "directives/menu-fab/menu-fab.html",
        restrict: 'E',
        link: function ($scope) {
            $scope.isOpen = false;
            $scope.canDelete = false;

            $scope.$watch('isOpen', function(isOpen) {
                if (isOpen) {
                    $timeout(function() {
                        $scope.tooltipVisible = $scope.isOpen;
                    }, 600);
                } else {
                    $scope.tooltipVisible = $scope.isOpen;
                }
            });

            $scope.onNew = function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                if ($scope.onClickNew) {
                    $scope.onClickNew();
                }
            };
            $scope.onDelete = function (ev) {
                $scope.canDelete = !$scope.canDelete;
            }
        }
    };
});