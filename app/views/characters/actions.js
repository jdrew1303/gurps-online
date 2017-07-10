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


    function modalData(template, ev, controller) {
     return {
         controller: controller,
         templateUrl: template,
         parent: angular.element(document.body),
         clickOutsideToClose: true,
         targetEvent: ev,
         resolve: {
             character: function () {
                 return $scope.character;
             }
         }
     }
    }

    var controllers = {
        vision: VisionCtrl,
        hearing: HearingCtrl,
        taste: TasteCtrl,
        danger: DangergCtrl,
        fright: FrightCtrl,
        diplomacy: DiplomacyCtrl,
        fasttalk: FastTalkCtrl,
        savoirfaire: SavoirFaireCtrl,
        intimidation: IntimidationCtrl,
        streetwise: StreetwiseCtrl,
    };

    $scope.action = function (template, ev, ctrl) {
        $mdDialog.show(modalData(template, ev, controllers[ctrl]));
    };
});

function linkScopeAndModal(scope, mdDialog) {
    scope.hide = function() {
        mdDialog.hide();
    };
    scope.cancel = function() {
        mdDialog.cancel();
    };
}





