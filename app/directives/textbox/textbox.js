/**
 * Created by lelabo on 16/06/17.
 */
angular.module('gurps-online').directive('textbox', function () {
    return {
        scope: {
            placeholder: "@",
            variable: "=",
        },
        templateUrl: "directives/textbox/textbox.html",
        restrict: 'E',
        link: function($scope, $element) {
        }
    };
});