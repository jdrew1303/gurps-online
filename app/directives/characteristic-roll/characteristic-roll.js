/**
 * Created by lelabo on 20/06/17.
 */
angular.module('gurps-online').directive('characteristicRoll', function ($timeout, $mdDialog) {
    return {
        scope: {
            shortname: "@",
            longname: "@",
            variable: "=",
        },
        templateUrl: "directives/characteristic-roll/characteristic-roll.html",
        restrict: 'E',
        link: function($scope, $element) {
            $scope.baseRoll = function (template, ev) {
                $mdDialog.show({
                    controller: RollController,
                    templateUrl: template,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    targetEvent: ev,
                    resolve: {
                        variable: function () {
                            return $scope.variable;
                        },
                        placeholder: function () {
                            return $scope.longname;
                        }
                    }
                });
            };
        }
    };
});

function RollController($scope, $mdDialog, Dices, variable, placeholder) {
    $scope.variable = variable;
    $scope.placeholder = placeholder;
    console.log($scope.variable);

    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.result = Dices.type_of_result(score, $scope.variable + modifier);
            console.log($scope.result);
        });
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}