/**
 * Created by lelabo on 10/07/17.
 */
function ClimbingCtrl($scope, $mdDialog, Dices, character) {
    // TODO : FP gestion
    // TODO : Add climbing documentation
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
    linkScopeAndModal($scope, $mdDialog);
}

function HikingCtrl($scope, $mdDialog, Dices, character) {
    // Todo: doc on hiking
    // TODO: Use the FP costs for fighting a battle, but assess them per hour of road travel; e.g., one hour of marching with light encumbrance costs 2 FP
    $scope.character = character;
    $scope.skill = character.health - 5;
    var activeskill = character.getSkills('Hiking');
    if (activeskill) {
        $scope.skill = character.health + activeskill.bonus;
    }
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 1;
        }
        Dices.roll('3d6').then(function (score) {
            $scope.score = score;
            $scope.result = 100;
            if ($scope.skill >= score) {
                $scope.result += 20;
            }
            $scope.result *= modifier;
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function JumpingCtrl($scope, $mdDialog, Dices, character) {
    // Todo: doc on jumping
    $scope.character = character;
    $scope.skill = character.dexterity;
    $scope.move = character.move;
    $scope.result = { success: null, high: 0, long: 0};
    var activeskill = character.getSkills('Jumping');
    if (activeskill) {
        $scope.skill = character.dexterity + activeskill.bonus;
        $scope.move = Math.floor($scope.skill / 2.0);
    }
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 1;
        }
        Dices.roll('3d6').then(function (score) {
            $scope.score = score;
            $scope.result.success = false;
            if ($scope.skill >= score) {
                $scope.result.success = true;
                $scope.result.high = Math.floor(($scope.move * 6 - 10 + modifier) * 2.54);
                $scope.result.long = Math.floor(($scope.move * 2 - 3 + modifier) * 30.48);
            }
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}