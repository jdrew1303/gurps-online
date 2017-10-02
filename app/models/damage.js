/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Damage', function($q, DamagesService) {

    var self = this;
    /**
     * Constructor, with class name
     */
    self.init = function () {
        self.damages = DamagesService.all();
    };

    self.find = function(strength) {
        strength = strength < 1 ? 1 : strength > 20 ? 20 : strength;
        var defered = $q.defer();
        self.damages.then(function (data) {
            angular.forEach(data, function (value) {
                if (strength == value.strength) {
                    defered.resolve(value);
                }
            });
            defered.reject();
        });
        return defered.promise;
    };

    return self;
});