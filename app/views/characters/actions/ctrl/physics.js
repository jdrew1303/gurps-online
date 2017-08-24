/**
 * Created by lelabo on 10/07/17.
 */
function ClimbingCtrl($scope, $mdDialog, Dices, character) {
    // TODO : FP gestion
    // TODO : Add climbing documentation
    $scope.placeholder = 'Climbing';
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
    $scope.placeholder = 'Hiking';
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
    $scope.placeholder = 'Jumping';
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

function LiftingCtrl($scope, $mdDialog, character) {
    // TODO: display things
    $scope.placeholder = 'Lifting';
    $scope.character = character;
    $scope.onehanded = character.lift * 2;
    $scope.doublehanded = character.lift * 8;
    $scope.shove = character.lift * 12;
    $scope.shovedouble = character.lift * 24;
    $scope.cary = character.lift * 10;
    $scope.caryextra = character.lift * 15;
    $scope.shift = character.lift * 50;

    $scope.select = function () {
        if ($scope.option == "Carry on Back (Extra)") {
            $scope.character.fp -= 1;
            CharactersService.update($scope.character);
        }
        $scope.hide();
    };
    linkScopeAndModal($scope, $mdDialog);
}

function RunningCtrl($scope, $mdDialog, CharactersService, Dices, character) {
    // TODO: display things
    $scope.placeholder = 'Running';
    $scope.character = character;
    console.log(character);
    $scope.sprint = character.move * 1.20 * 0.91;
    $scope.longrun = $scope.sprint / 2.0;
    if (character.fp <= character.health / 3.0) {
        $scope.sprint /= 2.0;
        $scope.longrun /= 2.0;
    }
    $scope.select = function () {
        if ($scope.option == "Long-Sprint") {
            Dices.roll('3d6').then(function (score) {
                if ($scope.character.health < score) {
                    $scope.character.fp -= 1;
                    CharactersService.update($scope.character);
                }
            });
        }
        $scope.hide();
    };
    linkScopeAndModal($scope, $mdDialog);
}

function SwimmingCtrl($scope, $mdDialog, CharactersService, Dices, character) {
    // TODO: display things
    $scope.placeholder = 'Swimming';
    $scope.character = character;
    $scope.skill = character.health - 4;
    $scope.bonus = true;
    var activeskill = character.getSkills('Swimming');
    if (activeskill) {
        $scope.skill = character.health + activeskill.bonus;
    }
    $scope.$watch('bonus', function (newValue, oldValue) {
        $scope.skill += newValue ? 3 : -3;
    });
    $scope.roll = function () {
        Dices.roll('3d6').then(function (score) {
            console.log(score);
            $scope.score = score;
            if ($scope.skill < score) {
                $scope.character.fp -= 1;
                CharactersService.update($scope.character);
            }
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}