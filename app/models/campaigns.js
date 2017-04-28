/**
 * Created by lelabo on 28/04/17.
 */
angular.module('gurps-online').factory('Campaigns', function() {

    /**
     * Constructor, with class name
     */
    function Campaigns(id, owner, name, players) {
        this._id = id;
        this.owner = owner;
        this.name = name;
        this.players = characterJsonToObject(players);
    }

    /**
     * Private function
     */
    function characterJsonToObject(campaigns) {
        var result = [];
        for (var i in campaigns) {
            result.push(Campaigns.build(campaigns[i]));
        }
        return result;
    }


    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Campaigns.build = function (data) {
        return new Campaigns(
            data._id,
            data._owner,
            data.name,
            data.players,
        );
    };

    Campaigns.json_to_objects = function (campaigns) {
        var result = [];
        angular.forEach(campaigns, function(value, key) {
            this.push(Campaigns.build(value));
        }, result);
        return result;
    };

    /**
     * Return the constructor function
     */
    return Campaigns;
});