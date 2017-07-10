/**
 * Created by lelabo on 10/07/17.
 */
function TasteCtrl($scope, $mdDialog, Dices, character) {
    $scope.placeholder = 'Taste / Smell';
    $scope.character = character;
    $scope.skill = character.intelligence;
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.result = Dices.type_of_result(score, $scope.skill + modifier);
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function VisionCtrl($scope, $mdDialog, Dices, character) {
    $scope.placeholder = 'Vision';
    $scope.skill = character.intelligence;

    var advg = character.getAdvantage("Acute Vision");
    if (advg) {
        $scope.skill += advg.level;
    }
    $scope.night = character.getAdvantage("Night Vision");
    if ($scope.night) {
        $scope.night.activated = false;
        $scope.$watch('night.activated', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.skill += newValue ? $scope.night.level : -$scope.night.level;
            }
        });
    }
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.result = Dices.type_of_result(score, $scope.skill + modifier);
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function HearingCtrl($scope, $mdDialog, Dices, character) {
    $scope.placeholder = 'Hearing';
    $scope.character = character;
    $scope.skill = character.intelligence;
    if (character.hasDisadvantage('Hard of Hearing')) {
        $scope.skill -= 4;
    }
    var advg = character.getAdvantage("Acute Hearing");
    if (advg) {
        $scope.skill += advg.level;
    }
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.result = Dices.type_of_result(score, $scope.skill + modifier);
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function FrightCtrl($scope, $mdDialog, Dices, character) {
    $scope.variable = character.intelligence;
    $scope.placeholder = 'Fright Check';

    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.result = Dices.type_of_result(score, $scope.variable + modifier);
            var margin = ($scope.variable + modifier) - score;
            if ($scope.result.value == Dices.critical_failure) {
                Dices.roll('1d6').then(function (duration) {
                    $scope.duration = 'Unconscious for: ' + (duration + margin).toString() + ' minutes.';
                    character.unconscious((duration + margin) * 60);
                });
            } else if ($scope.result.value == Dices.failure) {
                Dices.roll('2d6').then(function (duration) {
                    $scope.duration = 'Stunned for: ' + (duration + margin).toString() + ' seconds.';
                    character.knockdown(duration + margin);
                });
            }
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function DangergCtrl($scope, $mdDialog, Dices, character) {
    $scope.character = character;
    $scope.skill = character.intelligence;
    $scope.roll = function () {
        Dices.roll('3d6').then(function (score) {
            $scope.score = score;
            $scope.result = ($scope.score <= 4) ? 0 : ($scope.skill >= score) ? 1 : 2;
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function EmpathyCtrl($scope, $mdDialog, Dices, character) {
    $scope.variable = character.intelligence;
    $scope.placeholder = 'Empathy';

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
    linkScopeAndModal($scope, $mdDialog);
}