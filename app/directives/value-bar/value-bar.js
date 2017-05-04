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
                '#3F51B5',
                '#4850AE',
                '#524FA7',
                '#5B4EA0',
                '#654E9A',
                '#6E4D93',
                '#784C8C',
                '#814B86',
                '#8B4B7F',
                '#944A78',
                '#9E4972',
                '#A7486B',
                '#B14864',
                '#BA475E',
                '#C44657',
                '#CD4550',
                '#D7454A',
                '#E04443',
                '#EA433C',
                '#F44336',
            ];

            $scope.$watch('value', function(value) {
                var index = Math.round((100.0 - value) / 5.0);
                var bars = $element[0].querySelectorAll('.md-bar');
                for (var i = 0; i < bars.length; i++) {
                    bars[i].style.backgroundColor =  $scope.gradient[index];
                }
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