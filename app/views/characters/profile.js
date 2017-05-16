/**
 * Created by lelabo on 02/05/17.
 */
angular.module('gurps-online').controller('charactersProfileCtrl', function($scope, $state, $stateParams, $mdDialog,
                                                                            CharactersService, Characters, Appearance,
                                                                            OPH, Wealth, Reputation, MenuService) {

    $scope.saveChange = function () {
      CharactersService.update($scope.character).then(function () {
          loadCharacter();
      });
    };

    $scope.voiceChange = function (toggle) {
        if (toggle) {
            if ($scope.character.freexp >= 10) {
                $scope.character.freexp -= 10;
            } else {
                $scope.character.voice = false;
            }
        } else {
            $scope.character.freexp += 10;

        }
    };

    $scope.creation = false;
    $scope.appearance = null;
    $scope.appearanceIndex = function () {
      for (var i = 0; i < $scope.appearances.length; ++i) {
          if ($scope.character !== undefined) {
              if ($scope.appearances[i].name == $scope.character.appearance) {
                  return i;
              }
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

    function loadCharacter() {
        CharactersService.get($stateParams.characterId).then(function (character) {
            $scope.character = Characters.build(character);
            $scope.creation = character.status == 'created';
            console.log($scope.character);
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


    $scope.repText = '';
    $scope.level = 0;
    $scope.reputations = [];
    $scope.addReputation = function () {
        var rep = new Reputation($scope.repText, $scope.level);
        $scope.repText = '';
        $scope.level = 0;
        $scope.reputations.push(rep);
    };

    $scope.chipText = '';
    $scope.types = OPH.types;
    $scope.addchips = function () {
        $scope.character.habits.push({description: angular.copy($scope.chipText), type: $scope.chipType.title});
        $scope.character.freexp += $scope.chipType.cost;
        $scope.chipsText = '';
    };
    $scope.transformChip = function (chip) {
        return { description: chip.description, type: chip.type }
    };
    $scope.removeChips = function (chip) {
        $scope.character.freexp -= OPH.typevalues[chip.type];
    };

    $scope.wealths = Wealth.states;
    $scope.appearances = Appearance.states;
    $scope.state = Appearance.states[0];
    console.log($scope.appearances);
    $scope.myNumber = 10;
    this.slider = 10;
    $scope.canEdit = true;
    loadCharacter();

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
    }
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
