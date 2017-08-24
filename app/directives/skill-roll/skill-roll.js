/**
 * Created by lelabo on 20/06/17.
 */
angular.module('gurps-online').directive('skillRoll', function ($timeout, $mdDialog) {
    return {
        scope: {
            skill: "=",
            character: "=",
        },
        templateUrl: "directives/skill-roll/skill-roll.html",
        restrict: 'E',
        link: function($scope, $element) {

            var characteristic = [$scope.character.strength, $scope.character.dexterity, $scope.character.intelligence, $scope.character.health];
            $scope.variable = characteristic[$scope.skill.type] + $scope.skill.bonus;
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
                        skill: function () {
                            return $scope.skill;
                        }
                    }
                });
            };
        }
    };
});

function RollController($scope, $mdDialog, Dices, variable, skill) {
    $scope.placeholder = skill.name;
    $scope.variable = variable;

    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.result = Dices.type_of_result(score, $scope.variable + modifier);
        });
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}