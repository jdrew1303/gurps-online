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
            capital: '=',
            cost: '@',
            step: '@',
        },
        transclude: true,
        templateUrl: 'directives/number-picker/number-picker.html',
        link: function($scope, $element) {

            $scope.number = parseInt($scope.number, 10) || 0;
            if ($scope.capital !== undefined) {
                $scope.capital = parseInt($scope.capital, 10);
            }
            if ($scope.step === undefined) {
                $scope.step = 1;
            } else {
                $scope.step = parseInt($scope.step, 10)
            }
            if ($scope.cost === undefined) {
                $scope.cost = 1;
            } else {
                $scope.cost = parseInt($scope.cost, 10)
            }

            $scope.decrement = function(){
                if (!($scope.min !== undefined && $scope.number <= $scope.min)) {
                    if (($scope.capital !== undefined && $scope.capital + $scope.cost >= 0) || $scope.capital === undefined) {
                        $scope.number = $scope.number - $scope.step;
                        if ($scope.capital !== undefined) {
                            $scope.capital -= -$scope.cost;
                        }
                    }
                }
            };
            $scope.increment = function(){
                if(!($scope.max !== undefined && $scope.number >= $scope.max)){
                    if (($scope.capital !== undefined && $scope.capital - $scope.cost >= 0) || $scope.capital === undefined) {
                        $scope.number = $scope.number + $scope.step;
                        if ($scope.capital !== undefined) {
                            $scope.capital -= $scope.cost;
                        }
                    }
                }
            };
        }
    };
}]);
