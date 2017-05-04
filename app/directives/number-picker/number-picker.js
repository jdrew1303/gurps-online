/**
 * Created by lelabo on 02/05/17.
 */
angular.module('gurps-online').directive('numberPicker', ['$timeout', function($timeout){
    return {
        scope: {
            number: '=',
            edit: '=',
            min: '@',
            max: '@',
            step: '@',
            buttonClass: '@'
        },
        transclude: true,
        templateUrl: 'directives/number-picker/number-picker.html',
        link: function($scope, $element) {
            // default values
            var defaults = {
                min: 0,
                max: 100,
                step: 1
            };

            // object assign function for merging th default values with potential binding values
            var assign = function(dest, src) {
                for (var key in src) {
                    if (!dest[key]) {
                        dest[key] = src[key];
                    }
                }
                return dest;
            };

            $scope.number = parseInt($scope.number, 10) || 0;

            var opts = assign({
                min: this.min,
                max: this.max,
                step: this.step
            }, defaults);

            $scope.decrement = function(){
                if($scope.number <= opts.min){
                    return;
                }
                $scope.number = $scope.number - parseInt(opts.step, 10);

            };
            $scope.increment = function(){
                if($scope.number >= opts.max){
                    return;
                }
                $scope.number = $scope.number + parseInt(opts.step, 10);
            };
        }
    };
}]);
