/**
 * Created by lelabo on 25/04/17.
 */
angular.module('gurps-online').controller('charactersNewCtrl', function($scope, $state, CharactersService, MenuService) {
    MenuService.currentTitle = 'New';
    $scope.character = {
        name: "",
        exp: 0,
    };


    $scope.goBack = function () {
        $state.go('app.characters.menu');
    };

    $scope.newCharacter = function (data) {
        CharactersService.create(data.name, data.exp)
            .then(function (success) {
                $state.go('app.characters.menu');
            }, function (err) {
                console.log(err);
            });
    }
});