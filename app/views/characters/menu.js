/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').controller('charactersMenuCtrl', function($scope, $state, $timeout, CharactersService,
                                                                         MenuService) {

    MenuService.currentTitle = 'Menu';
    var self = this;
    self.isOpen = false;

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


    $scope.characters = null;
    CharactersService.userCharacters().then(function (success) {
        $scope.characters = success;
    }, function (error) {
        console.log(error);
    });
});