/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('Characters', function() {

    /**
     * Constructor, with class name
     */
    function Characters(id, owner, name, exp, campaign, status, st, dx, iq, ht, hand, hp, will, fp) {
        this._id = id;
        this.owner = owner;
        this.name = name;
        this.exp = exp;
        this.status = status;
        this.campaign = campaign;
        this.strength = st;
        this.dexterity = dx;
        this.intelligence = iq;
        this.health = ht;
        this.handedness = hand;
        this.hp = hp;
        this.will = will;
        this.fp = fp;
    }

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
            data.strength,
            data.dexterity,
            data.intelligence,
            data.health,
            data.handedness,
            data.hp,
            data.will,
            data.fp,
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