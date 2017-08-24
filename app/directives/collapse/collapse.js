/**
 * Created by lelabo on 24/08/17.
 */
angular.module('gurps-online').directive("collapse", function () {
    return {
        scope: {},
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: "directives/collapse/collapse.html",
        link: function ($scope, $element, $attrs) {
            $scope.collapsed = true;
            $scope.title = $attrs.collapsibleTitle;

            $scope.toggle = function collapsibleToggle(e) {
                e.preventDefault();
                $scope.collapsed = !$scope.collapsed;
            }
        }
    };
});