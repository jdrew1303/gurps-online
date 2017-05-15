/**
 * Created by lelabo on 03/05/17.
 */
angular.module('gurps-online').directive('valueBar', ['$timeout', '$mdDialog', function($timeout, $mdDialog){
    return {
        scope: {
            name: '@',
            value: '=',
            total: '=',
            info: '@'
        },
        templateUrl: 'directives/value-bar/value-bar.html',
        link: function($scope, $element) {

            $scope.gradient = [
                '#F44336',
                '#EA433C',
                '#E04443',
                '#D7454A',
                '#CD4550',
                '#C44657',
                '#BA475E',
                '#B14864',
                '#A7486B',
                '#9E4972',
                '#944A78',
                '#8B4B7F',
                '#814B86',
                '#784C8C',
                '#6E4D93',
                '#654E9A',
                '#5B4EA0',
                '#524FA7',
                '#4850AE',
                '#3F51B5',
            ];

            function computeScore() {
                $scope.score = Math.round(($scope.value / $scope.total) * 100.0);
            }

            function updateDisplay() {
                computeScore();
                var index = Math.round($scope.score / 5.0);
                var bars = $element[0].querySelectorAll('.md-bar');
                for (var i = 0; i < bars.length; i++) {
                    bars[i].style.backgroundColor =  $scope.gradient[index];
                }
            }

            computeScore();

            $scope.$watch('value', function(value) {
                updateDisplay();
            });
            $scope.$watch('total', function(value) {
                updateDisplay();
            });

            $scope.showInfo = function (template, ev) {
                $mdDialog.show({
                    controller: InfoController,
                    templateUrl: template,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    targetEvent: ev
                });
            };
        }
    };
}]);

function InfoController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}