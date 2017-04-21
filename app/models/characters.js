/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('Characters', function() {

    /**
     * Constructor, with class name
     */
    function Characters(owner, firstName, lastName, exp) {
        this.owner = owner;
        this.firstName = firstName;
        this.lastName = lastName;
        this.exp = exp;
        this.availablePoints = exp;
        this.status = possibleStatus.alive;
    }

    /**
     * Public method, assigned to prototype
     */
    Characters.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };

    /**
     * Private property
     */
    var possibleStatus = {
        alive: 0,
        dead: 1,
        in_campaign: 2
    };

    /**
     * Private function
     */
    function checkStatus(status) {
        return possibleStatus.hasOwnProperty(status) !== -1;
    }

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    Characters.possibleStatus = angular.copy(possibleStatus);

    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Characters.build = function (data) {
        return new Characters(
            data.owner,
            data.firstName,
            data.lastName,
            data.exp,
        );
    };

    /**
     * Return the constructor function
     */
    return Characters;
});