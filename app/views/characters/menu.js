/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').controller('charactersMenuCtrl', function($scope, $state, $timeout, CharactersService,
                                                                         MenuService) {

    MenuService.currentTitle = 'Menu';
    $scope.canDelete = false;

    $scope.characters = null;
    $scope.loadCharacters = function () {
        CharactersService.userCharacters().then(function (success) {
            $scope.characters = success;
        }, function (error) {
            console.log(error);
        });
    };
    $scope.loadCharacters();

    $scope.goToNew = function () {
        $state.go('app.characters.new');
    };

    $scope.deleteCharacter = function (character) {
        console.log(character);
        CharactersService.remove(character._id).then(function (resp) {
            $scope.loadCharacters();
        });
    };


});