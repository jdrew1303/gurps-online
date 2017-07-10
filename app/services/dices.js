/**
 * Created by lelabo on 17/06/17.
 */
angular.module('gurps-online').factory('Dices', function ($q, $resource, global) {
    var self = this;
    var serviceUri = global.api_dev + "/dices";
    var DicesResource = $resource(serviceUri, {}, {
        roll: {
            method: "POST",
            url: serviceUri + "/",
            headers: {
                'Content-Type': 'application/json'
            }
        },
    });

    self.critical_success = 0;
    self.success = 1;
    self.failure = 2;
    self.critical_failure = 3;

    var types_str = ["Critical Success", "Success", "Failure", "Critical Failure"];

    this.type_of_result = function(score, skill) {
        var code = self.failure;
        if (score <= 4 || (score == 5 && skill >= 15) || (score == 6 && skill >= 16)) {
            code = self.critical_success;
        } else if (score >= 18 || (score == 17 && skill <= 15) || (score - skill >= 10)) {
            code = self.critical_failure;
        } else if (score <= skill) {
            code = self.success;
        }
        return { value: code, text: types_str[code] };
    };

    this.compose = function (dices, modifier) {
        var res = dices;
        if (modifier !== undefined) {
            if (modifier > 0) {
                res += '+' + modifier;
            } else if (modifier < 0) {
                res += modifier;
            }
        }
        return res;
    };

    this.roll = function (descriptor) {
        var deferred = $q.defer();
        DicesResource.roll({expression: descriptor}).$promise.then(function (result) {
            deferred.resolve(result.score);
        }, function (error) {
            console.log(error);
        });
        return deferred.promise;
    };
    return this;
});