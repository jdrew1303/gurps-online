/**
 * Created by lelabo on 02/05/17.
 */
angular.module('gurps-online').controller('charactersProfileCtrl', function($scope, $state, $stateParams, $mdDialog,
                                                                            CharactersService, Characters, Appearance,
                                                                            OPH, Wealth, Reputation, Advantage,
                                                                            Disadvantage, MenuService,
                                                                            $log, $timeout, $q) {
    $scope.edit = true;
    $scope.creation = false;
    $scope.wealths = Wealth.states;
    $scope.appearances = Appearance.states;
    $scope.types = OPH.types;
    $scope.advantages = Advantage.advantages;
    loadCharacter();


    $scope.saveChange = function () {
      CharactersService.update($scope.character).then(function () {
          loadCharacter();
      });
    };

    $scope.advantages = loadAll(Advantage.advantages);
    $scope.advglevel = 1;
    $scope.advantageSearch = function(query) {
        var results = query ? $scope.advantages.filter( createFilterFor(query) ) : $scope.advantages, deferred;
        return results;
    };

    $scope.disadvantages = loadAll(Disadvantage.disadvantages);
    $scope.disadvglevel = 1;
    $scope.disadvantageSearch = function(query) {
        var results = query ? $scope.disadvantages.filter( createFilterFor(query) ) : $scope.disadvantages, deferred;
        return results;
    };

    $scope.exitAdvgInput = function() {
        $scope.itemChanging = false;
        $timeout(function () {
            if (!$scope.itemChanging) {
                document.getElementsByTagName('md-virtual-repeat-container')[0].removeAttribute("style");
            }
        }, 150);
    };

    $scope.exitDisadvgInput = function() {
        $scope.itemChanging = false;
        $timeout(function () {
            if (!$scope.itemChanging) {
                document.getElementsByTagName('md-virtual-repeat-container')[1].removeAttribute("style");
            }
        }, 150);
    };

    $scope.addAdvantage = function () {
        var advg = Advantage.str_to_object($scope.advgText);
        var level = $scope.advglevel;
        $scope.advglevel = 1;
        if (!advg.haslevel) {
            level = 1
        }
        if (!$scope.character.hasAdvantage($scope.advgText) && $scope.character.hasEnoughXp(level * advg.cost)) {
            advg.level = level;
            $scope.character.advantages.push(Advantage.instance($scope.advgText, level));
            $scope.character.advg_pretty.push(advg);
            $scope.character.freexp -= level * advg.cost;
        }
    };

    $scope.deleteAdvg = function (item) {
      $scope.character.removeAdvantage(item.name);
      $scope.character.freexp += item.cost * item.level;
      $scope.character.advg_pretty = Advantage.instances_to_advglist($scope.character.advantages);
    };

    $scope.addDisadvantage = function () {
        var disadvg = Disadvantage.str_to_object($scope.disadvgText);
        var level = $scope.disadvglevel;
        $scope.disadvglevel = 1;
        if (!disadvg.haslevel) {
            level = 1
        }
        if (!$scope.character.hasDisadvantage($scope.disadvgText) && $scope.character.hasEnoughXp(level * disadvg.cost)) {
            disadvg.level = level;
            $scope.character.disadvantages.push(Disadvantage.instance($scope.disadvgText, level));
            $scope.character.disadvg_pretty.push(disadvg);
            $scope.character.freexp -= level * disadvg.cost;
        }
    };

    $scope.deleteDisadvg = function (item) {
        $scope.character.removeDisadvantage(item.name);
        $scope.character.freexp += item.cost * item.level;
        $scope.character.advg_pretty = Disadvantage.instances_to_advglist($scope.character.disadvantages);
    };

    $scope.selectedAdvgChange = function(item) {
        $scope.itemChanging = true;
        if (item == undefined) {
            document.getElementsByTagName('md-virtual-repeat-container')[0].style.cssText  = $scope.style ;
        } else {
            $scope.style = document.getElementsByTagName('md-virtual-repeat-container')[0].style.cssText ;
            document.getElementsByTagName('md-virtual-repeat-container')[0].removeAttribute("style");
        }
    };

    $scope.selectedDisadvgChange = function(item) {
        $scope.itemChanging = true;
        if (item == undefined) {
            document.getElementsByTagName('md-virtual-repeat-container')[1].style.cssText  = $scope.style ;
        } else {
            $scope.style = document.getElementsByTagName('md-virtual-repeat-container')[1].style.cssText ;
            document.getElementsByTagName('md-virtual-repeat-container')[1].removeAttribute("style");
        }
    };


    function loadAll(content) {
        var objs = content;
        return objs.map( function (objs) {
            objs.value = objs.name.toLowerCase();
            return objs;
        });
    }

    $scope.createFilterFor = function(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
        };
    };

    $scope.voiceChange = function (toggle) {
        if (toggle) {
            if ($scope.character.hasEnoughXp(10)) {
                $scope.character.freexp -= 10;
            } else {
                $scope.character.voice = false;
            }
        } else {
            $scope.character.freexp += 10;
        }
    };
    $scope.appearance = null;
    $scope.appearanceIndex = function () {
        for (var i = 0; i < $scope.appearances.length; ++i) {
            if ($scope.character !== undefined && $scope.appearances[i].name == $scope.character.appearance) {
              return i;
            }
        }
    };
    $scope.appareanceChange = function(oldval, newval) {
        if ($scope.character !== undefined && newval.name !== $scope.character.appearance) {
            if (oldval !== undefined && oldval !== null) {
                $scope.character.freexp += oldval.cost;
            }
            if (newval !== undefined && newval !== null) {
                $scope.character.freexp -= newval.cost;
                $scope.character.appearance = newval.name;
            }
        }
    };
    $scope.wealth = null;
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

    $scope.repText = '';
    $scope.level = 0;
    $scope.addReputation = function () {
        if ($scope.level == 0 || !$scope.character.hasEnoughXp($scope.level * 5)) {
            return;
        }
        var rep = new Reputation($scope.repText, $scope.level);
        $scope.character.freexp -= $scope.level * 5;
        $scope.repText = '';
        $scope.level = 0;
        $scope.character.reputations.push(rep);
    };
    $scope.deleteReputation = function (item, index) {
        $scope.character.freexp += item.bonus * 5;
        $scope.character.reputations.splice(index);
    };
    $scope.chipText = '';
    $scope.addchips = function () {
        $scope.character.habits.push({description: angular.copy($scope.chipText), type: $scope.chipType.title});
        $scope.character.freexp += $scope.chipType.cost;
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
    $scope.$watch('edit', function() {
        $scope.canEdit = $scope.edit && $scope.creation;
    });
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
