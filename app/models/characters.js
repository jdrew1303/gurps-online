/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('Characters', function() {

    /**
     * Constructor, with class name
     */
    function Characters(id, owner, name, exp, campaign, status) {
        this._id = id;
        this.owner = owner;
        this.name = name;
        this.exp = exp;
        this.availablePoints = exp;
        this.status = status;
        this.campaign = campaign;
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
            data._id,
            data._owner,
            data.name,
            data.exp,
            data.campaign,
            data.status,
        );
    };

    Characters.json_to_objects = function (characters) {
        var result = [];
        angular.forEach(characters, function(value, key) {
            this.push(Characters.build(value));
        }, result);
        return result;
    };

    /**
     * Return the constructor function
     */
    return Characters;
});