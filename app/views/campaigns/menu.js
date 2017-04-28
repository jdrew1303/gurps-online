/**
 * Created by lelabo on 28/04/17.
 */
angular.module('gurps-online').controller('campaignsMenuCtrl', function($scope, $state, $timeout, CharactersService,
                                                                        MenuService) {

    MenuService.currentTitle = 'Menu';
    var self = this;
    self.isOpen = false;
    self.canDelete = false;

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

    $scope.$watch('vm.isOpen', function(isOpen) {
        if (isOpen) {
            $timeout(function() {
                $scope.tooltipVisible = self.isOpen;
            }, 600);
        } else {
            $scope.tooltipVisible = self.isOpen;
        }
    });

    $scope.deleteCharacter = function (character) {
        CharactersService.remove(character._id).then(function (resp) {
            console.log(resp);
            $scope.loadCharacters();
        });
    };


});