/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Appearance', function(AppearancesService) {

    /**
     * Constructor, with class name
     */
    var self = this;

    self.init = function () {
        self.promise = AppearancesService.all();
        self.promise.then(function (data) {
            self.states = data;
        })
    };

    self.index = function (scope) {
        return function () {
            if (scope.character === undefined) {
                return 0;
            }
            for (var i = 0; i < self.states.length; ++i) {
                if (self.states[i]._id == scope.character.appearance) {
                    return i;
                }
            }
            return 0;
        }
    };

    self.change = function (scope) {
        return function(oldval, newval) {
            if (scope.character !== undefined && oldval && newval && newval._id !== scope.character.appearance) {
                if (oldval !== undefined && oldval !== null) {
                    scope.character.freexp += oldval.cost;
                }
                if (newval !== undefined && newval !== null) {
                    scope.character.freexp -= newval.cost;
                    scope.character.appearance = newval._id;
                }
            }
        };
    };
    return self;
});