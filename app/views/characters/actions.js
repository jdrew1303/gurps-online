/**
 * Created by lelabo on 16/06/17.
 */
angular.module('gurps-online').controller('charactersActionCtrl', function($scope, $state, $stateParams, $mdDialog,
                                                                           Dices,
                                                                           CharactersService, Characters, MenuService) {

    function loadCharacter() {
        CharactersService.get($stateParams.characterId).then(function (character) {
            $scope.character = Characters.build(character);
            MenuService.currentTitle = 'Character : ' + $scope.character.name;
        }, function (err) {
            console.log(err);
        });
    }
    loadCharacter();

    $scope.climbing = function (template, ev) {
        $mdDialog.show({
            controller: ClimbingCtrl,
            templateUrl: template,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            targetEvent: ev,
            resolve: {
                character: function () {
                    return $scope.character;
                }
            }
        });
    };
});

function ClimbingCtrl($scope, $mdDialog, Dices, character) {
    $scope.character = character;
    $scope.skill = character.dexterity - 5;
    var activeskill = character.getSkills('Climbing');
    if (activeskill) {
        $scope.skill = character.dexterity + activeskill.bonus;
    }
    if (character.hasAdvantage("Flexibility")) {
        $scope.skill += 3;
    } else if (character.hasAdvantage("Double-Jointed")) {
        $scope.skill += 5;
    }
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.result = $scope.skill >= score;
        });
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}
