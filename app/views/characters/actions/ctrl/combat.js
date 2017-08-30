/**
 * Created by lelabo on 10/07/17.
 */
function PostureCtrl($scope, $mdDialog, CharactersService, PosturesService, character) {
    $scope.placeholder = 'Change Posture';
    $scope.character = character;

    PosturesService.all().then(function (postures) {
        $scope.postures = postures;
    });

    $scope.move = function () {
        character.posture = $scope.option._id;
        CharactersService.update(character);
        character.posture = $scope.option;
    };
    linkScopeAndModal($scope, $mdDialog);
}

function FreeActionCtrl($scope, $mdDialog, CharactersService, PosturesService, character) {
    $scope.placeholder = 'Free Action';
    $scope.character = character;

    $scope.select = function () {
        $scope.hide();
    };
    linkScopeAndModal($scope, $mdDialog);
}
