/**
 * Created by lelabo on 08/06/17.
 */
angular.module('gurps-online').factory('Skills', function() {

    /**
     * Constructor, with class name
     */
    function Skills(name, type, difficulty, bonus, info, cost) {
        this.name = name;
        this.type = type;
        this.difficulty = difficulty;
        this.bonus = bonus;
        this.info = info;
        this.cost = cost;
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

    var skillsList = [
        new Skills('Acrobatics', DX, hard, -6, "acrobatics.html", 0),
        new Skills('Acting', IQ, medium, -5, "acting.html", 0),
        new Skills('Animal Handling', IQ, medium, -5, "animalhandling.html", 0),
        new Skills('Area Knowledge', IQ, easy, -4, "areaknowledge.html", 0),
        new Skills('Armoury', IQ, medium, -5, "armoury.html", 0),
        new Skills('Brawling', DX, easy, -100, "brawling.html", 0),
        new Skills('Camouflage', IQ, easy, -4, "camouflage.html", 0),
        new Skills('Carousing', HT, easy, -4, "carousing.html", 0),
        new Skills('Climbing', DX, medium, -5, "climbing.html", 0),
        new Skills('Computer Operation', IQ, easy, -4, "computeroperation.html", 0),
        new Skills('Computer Programming', IQ, hard, -100, "computerprogramming.html", 0),
        new Skills('Crewman', IQ, easy, -4, "crewman.html", 0),
        new Skills('Criminology', IQ, medium, -5, "criminology.html", 0),
        new Skills('Diagnosis', IQ, hard, -100, "diagnosis.html", 0),
        new Skills('Disguise', IQ, medium, -5, "disguise.html", 0),
        new Skills('Electronics Operation', IQ, medium, -5, "electronicsoperation.html", 0),
        new Skills('Electronics Repair', IQ, medium, -5, "electronicsrepair.html", 0),
        new Skills('Engineer', IQ, hard, -100, "engineer.html", 0),
        new Skills('Battlesuit', IQ, medium, -5, "suit.html", 0),
        new Skills('Diving Suit', IQ, medium, -5, "suit.html", 0),
        new Skills('NBC Suit', IQ, medium, -5, "suit.html", 0),
        new Skills('Vacc Suit', IQ, medium, -5, "suit.html", 0),
        new Skills('Escape', DX, hard, -6, "escape.html", 0),
        new Skills('Explosives', IQ, medium, -5, "explosives.html", 0),
        new Skills('First Aid', IQ, easy, -4, "firstaid.html", 0),
        new Skills('Forgery', IQ, hard, -6, "forgery.html", 0),
        new Skills('Gambling', IQ, medium, -5, "gambling.html", 0),
        new Skills('Hiking', HT, medium, -5, "hiking.html", 0),
        new Skills('Holdout', IQ, medium, -5, "holdout.html", 0),
        new Skills('History', IQ, hard, -6, "university.html", 0),
        new Skills('Literature', IQ, hard, -6, "university.html", 0),
        new Skills('Philosophy', IQ, hard, -6, "university.html", 0),
        new Skills('Theology', IQ, hard, -6, "university.html", 0),
        new Skills('Arts', IQ, hard, -6, "university.html", 0),
        new Skills('Diplomacy', IQ, hard, -6, "influence.html", 0),
        new Skills('Fast-Talk', IQ, medium, -5, "influence.html", 0),
        new Skills('Intimidation', IQ, medium, -5, "influence.html", 0),
        new Skills('Savoir-Faire', IQ, easy, -4, "influence.html", 0),
        new Skills('Sex Appeal', HT, medium, -5, "influence.html", 0),
        new Skills('Streetwise', IQ, medium, -5, "influence.html", 0),
        new Skills('Interogation', IQ, medium, -5, "interogation.html", 0),
        new Skills('Jumping', DX, easy, -100, "jumping.html", 0),
        new Skills('Karate', DX, hard, -100, "karate.html", 0),
        new Skills('Law', IQ, hard, -6, "law.html", 0),
        new Skills('Leadership', IQ, medium, -5, "leadership.html", 0),
        new Skills('Lockpicking', IQ, medium, -5, "lockpicking.html", 0),
        new Skills('Mathematics', IQ, hard, -6, "math.html", 0),
        new Skills('Mechanic', IQ, medium, -5, "mechanic.html", 0),
        new Skills('Fencing Weapons', DX, medium, -5, "melee.html", 0),
        new Skills('Flails Weapons', DX, hard, -6, "melee.html", 0),
        new Skills('Impact Weapons', DX, medium, -5, "melee.html", 0),
        new Skills('Pole Weapons', DX, medium, -5, "melee.html", 0),
        new Skills('Sword Weapons', DX, medium, -5, "melee.html", 0),
        new Skills('Knife Weapons', DX, easy, -4, "melee.html", 0),
        new Skills('Merchant', IQ, medium, -5, "merchant.html", 0),
        new Skills('Flamethrower', DX, easy, -5, "missile.html", 0),
        new Skills('Gunner', DX, easy, -4, "missile.html", 0),
        new Skills('Guns', DX, easy, -4, "missile.html", 0),
        new Skills('Sarbacane/Blowpipe', DX, hard, -6, "missile.html", 0),
        new Skills('Bow', DX, medium, -5, "missile.html", 0),
        new Skills('Crossbow', DX, easy, -4, "missile.html", 0),
        new Skills('Astronomy', IQ, hard, -6, "naturalsciences.html", 0),
        new Skills('Biology', IQ, hard, -6, "naturalsciences.html", 0),
        new Skills('Chemistry', IQ, hard, -6, "naturalsciences.html", 0),
        new Skills('Geology', IQ, hard, -6, "naturalsciences.html", 0),
        new Skills('Physics', IQ, hard, -6, "naturalsciences.html", 0),
        new Skills('Naturalist', IQ, hard, -6, "naturalist.html", 0),
        new Skills('Navigation', IQ, medium, -5, "navigation.html", 0),
        new Skills('Observation', IQ, medium, -5, "observation.html", 0),
        new Skills('Occultism', IQ, medium, -5, "occultism.html", 0),
        new Skills('Photography', IQ, medium, -5, "photography.html", 0),
        new Skills('Physician', IQ, hard, -7, "physician.html", 0),
        new Skills('Pickpocket', DX, hard, -6, "pickpocket.html", 0),
        new Skills('Public Speaking', IQ, medium, -5, "publicspeaking.html", 0),
        new Skills('Research', IQ, medium, -5, "research.html", 0),
        new Skills('Riding', DX, medium, -5, "riding.html", 0),
        new Skills('Scrounging', IQ, easy, -4, "scrounging.html", 0),
        new Skills('Search', IQ, medium, -5, "search.html", 0),
        new Skills('Shadowing', IQ, medium, -5, "shadowing.html", 0),
        new Skills('Shield', DX, easy, -4, "shield.html", 0),
        new Skills('Anthropology', IQ, hard, -6, "socialsciences.html", 0),
        new Skills('Archeology', IQ, hard, -6, "socialsciences.html", 0),
        new Skills('Psychology', IQ, hard, -6, "socialsciences.html", 0),
        new Skills('Sociology', IQ, hard, -6, "socialsciences.html", 0),
        new Skills('Smugling', IQ, medium, -5, "smugling.html", 0),
        new Skills('Stealth', DX, medium, -5, "stealth.html", 0),
        new Skills('Survival', IQ, medium, -5, "survival.html", 0),
        new Skills('Swimming', HT, easy, -4, "swimming.html", 0),
        new Skills('Tactics', IQ, hard, -6, "tactics.html", 0),
        new Skills('Throwing', DX, easy, -3, "throwing.html", 0),
        new Skills('Thrown Weapons', DX, easy, -4, "thrown.html", 0),
        new Skills('Tracking', IQ, medium, -5, "tracking.html", 0),
        new Skills('Traps', IQ, medium, -5, "traps.html", 0),
        new Skills('Bicycling', DX, easy, -4, "vehicles.html", 0),
        new Skills('Boating', DX, medium, -5, "vehicles.html", 0),
        new Skills('Driving', DX, medium, -5, "vehicles.html", 0),
        new Skills('Piloting', DX, medium, -5, "vehicles.html", 0),
        new Skills('Submarine', DX, medium, -5, "vehicles.html", 0),
        new Skills('Writing', IQ, medium, -5, "writing.html", 0),
    ];

    Skills.str_to_object = function (name) {
        for (var i = 0; i < skillsList.length; ++i) {
            if (skillsList[i].name == name) {
                return skillsList[i];
            }
        }
        return null;
    };

    Skills.build = function (data) {
        return new Skills(data.name, data.attr, data.difficulty, data.bonus, data.info, data.cost);
    };


    Skills.to_json = function (obj) {
        return {
            name: obj.name,
            attr: obj.type,
            difficulty: obj.difficulty,
            bonus: obj.bonus,
            info: obj.info,
            cost: obj.cost,
        }
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
     * Static property
     * Using copy to prevent modifications to private property
     */
    Skills.available = angular.copy(skillsList);

    /**
     * Return the constructor function
     */
    return Skills;
});