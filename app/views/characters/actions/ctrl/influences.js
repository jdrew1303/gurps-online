/**
 * Created by lelabo on 10/07/17.
 */
function DiplomacyCtrl($scope, $mdDialog, Dices, character) {
    $scope.placeholder = 'Diplomacy';
    $scope.subtitle = 'Negotiation and compromise';
    $scope.character = character;
    $scope.skill = character.intelligence - 6;
    var skill = character.getSkills("Diplomacy");
    if (skill) {
        $scope.skill = character.intelligence + skill.bonus;
    }
    $scope.skill += character.charisma;
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.margin = $scope.skill - score;
            $scope.expected = $scope.margin >= 0 ? 'Good' : 'Bad';
            if ($scope.margin < 0) {
                $scope.comment = "Make a reaction roll to confirm.";
            }
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function FastTalkCtrl($scope, $mdDialog, Dices, character) {
    $scope.placeholder = 'Fast-Talk';
    $scope.subtitle = 'Lying and deceit.';
    $scope.character = character;
    $scope.skill = character.intelligence - 5;
    var skill = character.getSkills("Fast-Talk");
    if (skill) {
        $scope.skill = character.intelligence + skill.bonus;
    }
    $scope.skill += character.charisma;
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.margin = $scope.skill - score;
            $scope.expected = $scope.margin >= 0 ? 'Good' : 'Bad';
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function IntimidationCtrl($scope, $mdDialog, Dices, character) {
    $scope.placeholder = 'Intimidation';
    $scope.subtitle = 'Threats and violence.';
    $scope.character = character;
    $scope.skill = character.intelligence - 5;
    var skill = character.getSkills("Intimidation");
    if (skill) {
        $scope.skill = character.intelligence + skill.bonus;
    }
    $scope.skill += character.charisma;
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.margin = $scope.skill - score;
            $scope.expected = $scope.margin >= 0 ? 'Good' : 'Very Bad';
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function SavoirFaireCtrl($scope, $mdDialog, Dices, character) {
    $scope.placeholder = 'Savoir-Faire';
    $scope.subtitle = 'Manners and etiquette. Mainly useful in "high society" situations.';
    $scope.character = character;
    $scope.skill = character.intelligence - 4;
    var skill = character.getSkills("Savoir-Faire");
    if (skill) {
        $scope.skill = character.intelligence + skill.bonus;
    }
    $scope.skill += character.charisma;
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.margin = $scope.skill - score;
            $scope.expected = $scope.margin >= 0 ? 'Good' : 'Bad';
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}

function StreetwiseCtrl($scope, $mdDialog, Dices, character) {
    $scope.placeholder = 'Streetwise';
    $scope.subtitle = 'Contacts and (usually) subtle intimidation. Only useful in "street" and criminal situations.';
    $scope.character = character;
    $scope.skill = character.intelligence - 5;
    var skill = character.getSkills("Streetwise");
    if (skill) {
        $scope.skill = character.intelligence + skill.bonus;
    }
    $scope.skill += character.charisma;
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.margin = $scope.skill - score;
            $scope.expected = $scope.margin >= 0 ? 'Good' : 'Bad';
        });
    };
    linkScopeAndModal($scope, $mdDialog);
}