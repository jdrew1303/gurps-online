/**
 * Created by lelabo on 28/04/17.
 */
angular.module('gurps-online').factory('Campaigns', function() {

    /**
     * Constructor, with class name
     */
    function Campaigns(owner, name, exp) {
        this.owner = owner;
        this.name = name;
        this.exp = exp;
        this.availablePoints = exp;
        this.status = possibleStatus.alive;
    }

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
            data._owner,
            data.name,
            data.exp,
        );
    };

    /**
     * Return the constructor function
     */
    return Characters;
});