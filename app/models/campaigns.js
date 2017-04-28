/**
 * Created by lelabo on 28/04/17.
 */
angular.module('gurps-online').factory('Campaigns', function() {

    /**
     * Constructor, with class name
     */
    function Campaigns(owner, name, players) {
        this.owner = owner;
        this.name = name;
        this.players = characterJsonToObject(players);
    }

    /**
     * Private function
     */
    function characterJsonToObject(characters) {
        var result = [];
        for (var i in characters) {
            result.push(Characters.build(characters[i]));
        }
        return result;
    }


    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Campaigns.build = function (data) {
        return new Campaigns(
            data._owner,
            data.name,
            data.players,
        );
    };

    /**
     * Return the constructor function
     */
    return Campaigns;
});