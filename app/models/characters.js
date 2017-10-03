/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').factory('Characters', function(Advantage, Skills, Damage) {

    /**
     * Constructor, with class name
     */
    function Characters(source) {
        for(var k in source) {
            this[k] = source[k];
        }
        console.log(this.posture);
        this.computeSecondaryStats();
        this.computeDamage();
    }

    /**
     * Public method, assigned to prototype
     */
    Characters.prototype.computeSpeed = function () {
        this.speed = (this.health + this.dexterity) / 4.0;
    };
    Characters.prototype.computeDodge = function () {
        this.dodge = Math.floor(this.speed + 3.0) - this.encumbrance;
    };
    Characters.prototype.computeMove = function () {
        this.move = Math.floor(this.speed) * (1.0 - (0.2 * this.encumbrance)) * this.posture.movement;
    };
    Characters.prototype.computeLift = function () {
        this.lift = (Math.floor(Math.pow(this.strength, 2) / 5.0) * 0.45);
    };
    Characters.prototype.computeSecondaryStats = function () {
        this.computeSpeed();
        this.computeDodge();
        this.computeMove();
        this.computeLift();
    };
    Characters.prototype.computeDamage = function () {
        var self = this;
        Damage.find(this.strength).then(function (data) {
            self.thrust = data.thrust.bonus ? "{0}d{1}".format(data.thrust.dice, data.thrust.bonus) : "{0}d".format(data.thrust.dice);
            self.swing = data.swing.bonus ? "{0}d{1}".format(data.swing.dice, data.swing.bonus) : "{0}d".format(data.swing.dice);
        });
    };
    Characters.prototype.changeEncumbrance = function(newvalue) {
      this.encumbrance = newvalue;
      this.computeDodge();
      this.computeLift();
    };

    Characters.prototype.hasEnoughXp = function (amount) {
        return this.freexp >= amount;
    };

    function findObjectByName(collection, name) {
        var found = false;
        for(var i = 0; i < collection.length; i++) {
            if (collection[i].name == name) {
                found = true;
                break;
            }
        }
        return found;
    }

    Characters.prototype.hasAdvantage = function (name) {
        return findObjectByName(this.advantages, name)
    };

    Characters.prototype.hasDisadvantage = function (name) {
        return findObjectByName(this.disadvantages, name)
    };

    Characters.prototype.hasSkills = function (name) {
        return findObjectByName(this.skills, name)
    };

    function removeObjectByName(collection, name) {
        for(var i = 0; i < collection.length; i++) {
            if (collection[i].name == name) {
                collection.splice(i, 1);
                break;
            }
        }
    }

    Characters.prototype.removeAdvantage = function (name) {
        removeObjectByName(this.advantages, name);
    };

    Characters.prototype.removeDisadvantage = function (name) {
        removeObjectByName(this.disadvantages, name);
    };

    Characters.prototype.removeSkills = function (name) {
        removeObjectByName(this.skills, name);
    };

    function getObjectByName(collection, name) {
        for(var i = 0; i < collection.length; i++) {
            if (collection[i].name == name) {
                return collection[i];
            }
        }
        return null;
    }

    Characters.prototype.getAdvantage = function(name) {
        return getObjectByName(this.advantages, name);
    };

    Characters.prototype.getSkills = function (name) {
        return getObjectByName(this.skills, name);
    };

    Characters.prototype.knockdown = function (duration) {
      // TODO
    };

    Characters.prototype.unconscious = function (duration) {
        // TODO
    };


    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Characters.build = function (data) {
        return new Characters(data);
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