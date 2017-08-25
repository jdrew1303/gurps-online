/**
 * Created by lelabo on 10/07/17.
 */
function PostureCtrl($scope, $mdDialog, CharactersService, PosturesService, character) {
    // TODO : FP gestion
    // TODO : Add climbing documentation
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
