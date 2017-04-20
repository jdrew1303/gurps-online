/**
 * Created by lelabo on 15/04/17.
 */
angular.module('gurps-online').directive('menuLink', function () {
    return {
        scope: {
            section: '='
        },
        templateUrl: 'directives/menu-link/menu-link.html',
        link: function ($scope, $element) {
            var controller = $element.parent().controller();

            $scope.focusSection = function () {
                // set flag to be used later when
                // $locationChangeSuccess calls openPage()
                controller.currentSection = $scope.section;
                controller.autoFocusContent = true;
            };
        }
    };
})