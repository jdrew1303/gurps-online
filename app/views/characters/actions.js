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


});

