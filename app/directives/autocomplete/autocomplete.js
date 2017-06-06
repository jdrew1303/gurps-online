/**
 * Created by lelabo on 26/05/17.
 */
angular.module('gurps-online').directive('bluring', function($timeout) {
    return {
        restrict: 'A',
        require: "^mdAutocomplete",
        link: function($scope, $element, $attributes, $mdAutocompleteCtrl) {
            $timeout(function() {
                $mdAutocompleteCtrl.blur = function() {
                    $scope.$eval($attributes.bluring);
                };
            });
        }
    };
});