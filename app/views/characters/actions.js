/**
 * Created by lelabo on 16/06/17.
 */
angular.module('gurps-online').controller('charactersActionCtrl', function($scope, $state, $stateParams, $mdDialog,
                                                                           Dices, Skills,
                                                                           CharactersService, Characters, MenuService) {

    function loadCharacter() {
        CharactersService.get($stateParams.characterId).then(function (character) {
            $scope.character = Characters.build(character);
            MenuService.currentTitle = 'Character : ' + $scope.character.name;

            $scope.knownSkills = [];
            angular.forEach($scope.character.skills, function(value) {
                this.push(value.name);
            }, $scope.knownSkills);
            $scope.unknownSkills = [];
            angular.forEach(Skills.available, function(value) {
                if (!$scope.knownSkills.includes(value.name)) {
                    this.push({name: value.name, bonus: value.bonus, type: value.type});
                }
            }, $scope.unknownSkills);
        }, function (err) {
            console.log(err);
        });
    }
    loadCharacter();

    // TODO: refactoring modifier system (inverse value + apply after roll in order to detect critical faillure).
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
        sexappeal: SexAppealCtrl,
        climbing: ClimbingCtrl,
        hiking: HikingCtrl,
        jumping: JumpingCtrl,
        lifting: LiftingCtrl,
        running: RunningCtrl,
        swimming: SwimmingCtrl,
    };
    $scope.specialActions = ['Climbing', 'Hiking', 'Diplomacy', 'Fast-Talk', 'Intimidation', 'Savoir-Faire', 'Sex Appeal',
    'Streetwise', 'Interogation', 'Jumping', 'Swimming'];


    $scope.action = function (template, ev, ctrl) {
        $mdDialog.show(modalData(template, ev, controllers[ctrl]));
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
});

function linkScopeAndModal(scope, mdDialog) {
    scope.hide = function() {
        mdDialog.hide();
    };
    scope.cancel = function() {
        mdDialog.cancel();
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



