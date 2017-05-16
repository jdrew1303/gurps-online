/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('Characters', function() {

    /**
     * Constructor, with class name
     */
    function Characters(id, owner, name, exp, freexp, campaign, status, st, dx, iq, ht, hand, hp, will, fp,
                        charisma, voice, appearance, habits) {
        this._id = id;
        this.owner = owner;
        this.name = name;
        this.exp = exp;
        this.freexp = freexp;
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
        this.charisma = charisma;
        this.voice = voice;
        this.appearance = appearance;
        this.habits = habits;
        this.computeSecondaryStats();
        this.computeDamage();
    }

    var damageTable = [
        ['1d-6', '1d-5'],
        ['1d-6', '1d-5'],
        ['1d-5', '1d-4'],
        ['1d-5', '1d-4'],
        ['1d-4', '1d-3'],
        ['1d-4', '1d-3'],
        ['1d-3', '1d-2'],
        ['1d-3', '1d-2'],
        ['1d-2', '1d-1'],
        ['1d-2', '1d'],
        ['1d-1', '1d+1'],
        ['1d-1', '1d+2'],
        ['1d', '2d-1'],
        ['1d', '2d'],
        ['1d+1', '2d+1'],
        ['1d+1', '2d+2'],
        ['1d+2', '3d-1'],
        ['1d+2', '3d'],
        ['2d-1', '3d+1'],
        ['2d-1', '3d+2'],
    ];

    /**
     * Public method, assigned to prototype
     */
    Characters.prototype.computeSpeed = function () {
        this.speed = (this.health + this.dexterity) / 4.0;
    };
    Characters.prototype.computeDodge = function () {
        this.dodge = Math.floor(this.speed + 3);
    };
    Characters.prototype.computeMove = function () {
        this.move = Math.floor(this.speed);
    };
    Characters.prototype.computeSecondaryStats = function () {
        this.computeSpeed();
        this.computeDodge();
        this.computeMove()
    };
    Characters.prototype.computeDamage = function () {
        var st = this.strength - 1;
        st = st % 19;
        if (st < 0) {
            st = 0;
        }
        this.thrust = damageTable[st][0];
        this.swing = damageTable[st][1];
    };

    Characters.prototype.to_json = function () {
        return {
            exp: this.exp,
            freexp: this.freexp,
            campaign: this.campaign,
            status: this.status,
            strength: this.strength,
            dexterity: this.dexterity,
            intelligence: this.intelligence,
            health: this.health,
            handedness: this.handedness,
            hp: this.hp,
            will: this.will,
            fp: this.fp,
            charisma: this.charisma,
            voice: this.voice,
            appearance: this.appearance,
            habits: this.habits,
        };
    };

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
            data.freexp,
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
            data.charisma,
            data.voice,
            data.appearance,
            data.habits,
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