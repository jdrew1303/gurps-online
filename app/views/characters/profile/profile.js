/**
 * Created by lelabo on 02/05/17.
 */
angular.module('gurps-online').controller('charactersProfileCtrl', function($scope, $state, $stateParams, $mdDialog,
                                                                            Appearance,
                                                                            CharactersService, Characters, Resource,
                                                                            OPH, Reputation, Advantage,
                                                                            Disadvantage, Skills, MenuService, SkillsService) {


    $scope.edit = false;
    $scope.creation = false;
    Resource.appearances.then(function (appearances) {
        $scope.appearances = appearances;
    });
    Resource.advantages.then(function (advantages) {
        $scope.advantages = advantages;
    });
    Resource.disadvantages.then(function (disadvantages) {
        $scope.disadvantages = disadvantages;
    });
    Resource.wealths.then(function (wealths) {
        $scope.wealths = wealths;
    });
    $scope.types = OPH.types;
    $scope.repText = '';
    $scope.level = 0;
    SkillsService.all().then(function (data) {
        $scope.skills = Skills.json_to_objects(data);
    });

    loadCharacter();

    $scope.goToAction = function () {
        $state.go('app.characters.actions', {'characterId': $scope.character._id});
    };

    $scope.saveChange = function () {
        if ($scope.canEdit) {
            $scope.character.hp = $scope.character.health;
            $scope.character.fp = $scope.character.health;
            $scope.character.will = $scope.character.intelligence;
        }
        CharactersService.update($scope.character).then(function () {
          loadCharacter();
        });
    };

    $scope.data = {};
    $scope.data.advglevel = 1;
    $scope.skillslevel = 1;

    $scope.addAdvantage = function (text) {
        var advg = Advantage.str_to_object(text);
        var level = $scope.data.advglevel;
        $scope.data.advglevel = 1;
        if (!advg.haslevel) {
            level = 1
        }
        if (!$scope.character.hasAdvantage(text) && $scope.character.hasEnoughXp(level * advg.cost)) {
            advg.level = level;
            $scope.character.advantages.push(Advantage.instance(text, level));
            $scope.character.advg_pretty.push(advg);
            $scope.character.freexp -= level * advg.cost;
        }
    };

    $scope.deleteAdvg = function (item) {
      $scope.character.removeAdvantage(item.name);
      $scope.character.freexp += item.cost * item.level;
      $scope.character.advg_pretty = Advantage.instances_to_advglist($scope.character.advantages);
    };

    $scope.addDisadvantage = function (text) {
        var disadvg = Disadvantage.str_to_object(text);
        if (!$scope.character.hasDisadvantage(text) && $scope.character.hasEnoughXp(disadvg.cost)) {
            $scope.character.disadvantages.push(Disadvantage.instance(text));
            $scope.character.disadvg_pretty.push(disadvg);
            $scope.character.freexp -= disadvg.cost;
        }
    };

    $scope.deleteDisadvg = function (item) {
        $scope.character.removeDisadvantage(item.name);
        $scope.character.freexp += item.cost;
        $scope.character.advg_pretty = Disadvantage.instances_to_advglist($scope.character.disadvantages);
    };

    $scope.addSkills = function (text) {
        var skills = Skills.str_to_object(text);
        if (!$scope.character.hasSkills(text)) {
            $scope.character.skills.push(skills);
        }
    };

    $scope.deleteSkills = function (item) {
        $scope.character.freexp += item.cost;
        $scope.character.removeSkills(item.name);
    };

    $scope.upgradeSkill = function (item) {
        var oldBonus = item.bonus;
        item.bonus += 1;
        if (!Skills.changeAuthorized(item.difficulty, item.bonus)) {
            item.bonus = 0 - item.difficulty;
        }
        var cost = Skills.cost(item.difficulty, item.bonus);
        if ($scope.character.freexp >= cost - item.cost) {
            $scope.character.freexp += item.cost - cost;
            item.cost = cost;
        } else {
            item.bonus= oldBonus;
        }
    };

    $scope.downgradeSkill = function (item) {
        if (item.cost > 0) {
            item.bonus -= 1;
            if (Skills.changeAuthorized(item.difficulty, item.bonus)) {
                var cost = Skills.cost(item.difficulty, item.bonus);
                $scope.character.freexp += item.cost - cost;
                item.cost = cost;
            } else {
                item.bonus += 1;
            }
        }
    };

    $scope.appearanceIndex = Appearance.index($scope);
    $scope.appearanceChange = Appearance.change($scope);

    $scope.wealthIndex = function () {
        for (var i = 0; i < $scope.wealths.length; ++i) {
            if ($scope.character !== undefined && $scope.wealths[i].multiplicator == $scope.character.wealthfactor) {
                    return i;
            }
        }
    };
    $scope.wealthChange = function(oldval, newval) {
        if ($scope.character !== undefined && newval.multiplicator !== $scope.character.wealthfactor) {
            if (oldval !== undefined && oldval !== null) {
                $scope.character.freexp += oldval.cost;
            }
            if (newval !== undefined && newval !== null) {
                $scope.character.freexp -= newval.cost;
                $scope.character.wealthfactor = newval.multiplicator;
            }
        }
    };


    $scope.addReputation = function (level) {
        console.log(level);
        console.log($scope.character.hasEnoughXp(level * 5));
        if ($scope.level == 0 || !$scope.character.hasEnoughXp(level * 5)) {
            return;
        }
        var rep = new Reputation($scope.repText, level);
        $scope.character.freexp -= level * 5;
        $scope.repText = '';
        $scope.level = 0;
        $scope.character.reputations.push(rep);
    };
    $scope.deleteReputation = function (item, index) {
        $scope.character.freexp += item.bonus * 5;
        $scope.character.reputations.splice(index);
    };

    $scope.chipText = '';
    $scope.addchips = function (item, text) {
        $scope.character.habits.push({description: angular.copy(text), type: item.title});
        $scope.character.freexp += item.cost;
        $scope.chipText = '';
    };

    $scope.transformChip = function (chip) {
        return { description: chip.description, type: chip.type }
    };
    $scope.removeChips = function (chip) {
        $scope.character.freexp -= OPH.typevalues[chip.type];
    };
    function loadCharacter() {
        CharactersService.get($stateParams.characterId).then(function (character) {
            $scope.character = Characters.build(character);
            $scope.character.advg_pretty = Advantage.instances_to_advglist($scope.character.advantages);
            $scope.character.disadvg_pretty = Disadvantage.instances_to_advglist($scope.character.disadvantages);
            $scope.creation = character.status == 'created';
            $scope.canEdit = $scope.edit && $scope.creation;
            MenuService.currentTitle = 'Character : ' + $scope.character.name;
        }, function (err) {
            console.log(err);
        });
    }
    function updateCharacterStats() {
        if ($scope.character !== undefined && $scope.character !== 'undefined' && $scope.character.hasOwnProperty('_id')) {
            $scope.character.computeSecondaryStats();
        }
    }
    $scope.$watch('character.health', function() {
        updateCharacterStats();
    });
    $scope.$watch('character.dexterity', function() {
        updateCharacterStats();
    });
    $scope.$watch('character.strength', function() {
        if ($scope.character !== undefined && $scope.character !== 'undefined' && $scope.character.hasOwnProperty('_id')) {
            $scope.character.computeDamage();
        }
    });
    $scope.editOnOff = function() {
        $scope.edit = !$scope.edit;
        $scope.canEdit = $scope.edit && $scope.creation;
    };
    $scope.showJoin = function (ev) {
        $mdDialog.show({
            controller: JoinController,
            templateUrl: 'views/characters/join.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            targetEvent: ev
        }).then(function(answer) {
            CharactersService.joinCampaign($scope.character._id, answer._id).then(function () {
                loadCharacter();
            });
        });
    };
    $scope.showInfo = function (template, ev) {
        $mdDialog.show({
            controller: InfoController,
            templateUrl: template,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            targetEvent: ev
        });
    };
    $scope.leave = function () {
        CharactersService.leaveCampaign($scope.character._id).then(function () {
            loadCharacter();
        });
    };
});

function JoinController($scope, $mdDialog, CampaignService, Campaigns) {
    CampaignService.all().then(function (success) {
        $scope.campaigns = Campaigns.json_to_objects(success);
    }, function (err) {
        console.log(err);
    });

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.joinIt = function(answer) {
        $mdDialog.hide(answer);
    };
}

function InfoController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}
