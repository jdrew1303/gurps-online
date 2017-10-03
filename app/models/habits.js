/**
 * Created by lelabo on 09/05/17.
 */
angular.module('gurps-online').factory('Habits', function($mdDialog, HabitsService) {

    var self = this;

    self.init = function () {
        HabitsService.types().then(function (data) {
            self.types = data;
        });
    };

    self.new = function (scope) {
        return function () {
            $mdDialog.show({
                controller: HabitsCtrl,
                templateUrl: '/views/characters/profile/habits.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                targetEvent: null,
                resolve: {
                    types: function () {
                        return self.types;
                    },
                    parent_scope: function () {
                        return scope;
                    }
                }
            });
        };
    };

    return self;
});

function HabitsCtrl($scope, $mdDialog, types, parent_scope) {
    $scope.types = types;
    $scope.habit = {
        name: '',
        description: '',
        type: null
    };
    $scope.hide = function() {
        $scope.habit._type = $scope.habit.type._id;
        parent_scope.character.habits.push($scope.habit);
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}