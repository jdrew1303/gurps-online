/**
 * Created by lelabo on 15/04/17.
 */
angular.module('gurps-online').directive('menuToggle', [ '$timeout', function($timeout){
    return {
        scope: {
            section: '='
        },
        templateUrl: 'directives/menu-toogle/menu-toogle.html',
        link: function($scope, $element) {
            var controller = $element.parent().controller();
            $scope.isOpen = function() {
                return controller.isOpen($scope.section);
            };
            $scope.toggle = function() {
                controller.toggleOpen($scope.section);
            };
        }
    };
}]);