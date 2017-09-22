/**
 * Created by lelabo on 08/06/17.
 */
angular.module('gurps-online').factory('Skills', function() {

    /**
     * Constructor, with class name
     */
    function Skills(id, name, attribute, difficulty, base, info) {
        this._id = id;
        this.name = name;
        this.attribute = attribute;
        this.difficulty = difficulty;
        this.base = base;
        this.info = info;
    }

    Skills.changeAuthorized = function (difficulty, bonus) {
        if ((difficulty == easy && bonus < 0) || (difficulty == medium && bonus < -1)
            || (difficulty == hard && bonus < -2)) {
            return false
        }
        return true;
    };

    function powthenadd(begin, end, desired) {
        var cost = 1;
        for (var i = begin + 1; i <= end && i <= desired; ++i) {
            cost *= 2;
        }
        for (var i = end + 1; i <= desired; ++i) {
            cost += 4;
        }
        return cost;
    }

    Skills.cost = function(difficulty, bonus) {
        if (!Skills.changeAuthorized(difficulty, bonus)) {
            return 0;
        }
        return powthenadd(0 - difficulty, 3 - difficulty, bonus);
    };


    var ST = 0, DX = 1, IQ = 2, HT = 3;
    var skillType = ["ST", "DX", "IQ", "HT"];
    var easy = 0, medium = 1, hard = 2;
    var skillDifficulty = ["Easy", "Average", "Hard"];

    Skills.prototype.desc = function () {
        var type = skillType[this.type];
        var difficulty = skillDifficulty[this.difficulty];
        return type + "/" + difficulty;
    };

    Skills.build = function (data) {
        return new Skills(data._id, data.name, data.attribute, data.difficulty, data.base, data.info);
    };

    Skills.json_to_objects = function (skills) {
        var result = [];
        angular.forEach(skills, function(value, key) {
            this.push(Skills.build(value));
        }, result);
        return result;
    };

    Skills.prototype.to_json = function () {
        return {
            name: this.name,
            attr: this.type,
            difficulty: this.difficulty,
            bonus: this.bonus,
            info: this.info,
            cost: this.cost,
        }
    };
    /**
     * Return the constructor function
     */
    return Skills;
});