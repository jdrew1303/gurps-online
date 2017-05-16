/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').controller('charactersMenuCtrl', function($scope, $state, $timeout, CharactersService,
                                                                         Characters, MenuService) {

    MenuService.currentTitle = 'Characters';
    $scope.canDelete = false;

    $scope.characters = null;
    $scope.loadCharacters = function () {
        CharactersService.userCharacters().then(function (success) {
            console.log(success);
            $scope.characters = Characters.json_to_objects(success);
        }, function (error) {
            console.log(error);
        });
    };
    $scope.loadCharacters();

    $scope.goToNew = function () {
        $state.go('app.characters.new');
    };
    $scope.goToProfile = function (character) {
      $state.go('app.characters.profile', {'characterId': character._id});
    };

    $scope.deleteCharacter = function (character) {
        console.log(character);
        CharactersService.remove(character._id).then(function (resp) {
            $scope.loadCharacters();
        });
    };


});