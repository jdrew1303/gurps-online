/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Advantage', function() {

    /**
     * Constructor, with class name
     */
    function Advantage(name, haslevel, cost, desc, info, action) {
        this.name = name;
        this.haslevel = haslevel;
        this.cost = cost;
        this.description = desc;
        this.action = action;
        this.info = info;
        this.level = 0
    }

    function AdvantageInstance(name, level) {
        this.name = name;
        this.level = level;
    }

    Advantage.prototype.desc = function () {
        var substr = "";
        if (this.haslevel) {
            substr += "/level";
        }
        return this.cost + substr;
    };

    var advantageTable = [
        new Advantage('Acute Hearing', true, 2, "+1 to Hearing rolls", "senses.html", null),
        new Advantage('Acute Taste and Smell', true, 2, "+1 to Taste and Smell rolls", "senses.html", null),
        new Advantage('Acute Touch', true, 2, "+1 to Touch rolls", "senses.html", null),
        new Advantage('Acute Vision', true, 2, "+1 to Vision rolls", "senses.html", null),
        new Advantage('Ambidexterity', false, 5, "No wrong hand malus.", "ambidexterity.html", null),
        new Advantage('Animal Empathy', false, 5, "Reveals beast emotionnal state and Influence them.", "animalempathy.html", null),
        new Advantage('Catfall', false, 10, "Fall < 4.572 = Automatic Success", "catfall.html", null),
        new Advantage('Combat Reflexes', false, 15, "+1 to active defense / +2 Fright Checks / +6 IQ vs stun, wake up, surprise.", "combatreflexes.html", null),
        new Advantage('Danger Sense', false, 15, "GM rolls against Perception. Success = warning.", "dangersense.html", null),
        new Advantage('Daredevil', false, 15, "Reveal NPC emotion on first contact.", "empathy.html", null),
        new Advantage('Enhanced Block', true, 5, "+1/level to block with shield skill.", "defenses.html", null),
        new Advantage('Enhanced Dodge', true, 15, "+1/level to dodge.", "defenses.html", null),
        new Advantage('Enhanced Parry Melee', true, 5, "+1/level for bare hands or melee weapons", "defenses.html", null),
        new Advantage('Enhanced Parry All', true, 10, "+1/level for all parries", "defenses.html", null),
        new Advantage('Fearlessness', true, 2, "Bonus on Fright Check or Intimidation.", "fearlessness.html", null),
        new Advantage('Flexibility', false, 5, "+3 on Climbing, on Escape. Ignore -3 for working in close spaces.", "flexibility.html", null),
        new Advantage('Double-Jointed', false, 15, "+5 on Climbing, on Escape. Ignore -5 for working in close spaces.", "flexibility.html", null),
        new Advantage('Hard to Kill', true, 2, "+1 to HT roll for survival.", "hardtokill.html", null),
        new Advantage('High Pain Threshold', true, 10, "+3 on HT roll vs knockdown, stunning, torturing. Will+3 to ignore pain.", "hardtokill.html", null),
        new Advantage('Jumper (Time)', false, 100, "Travel through time.", "jumper.html", null),
        new Advantage('Jumper (Space)', false, 100, "Travel through space.", "jumper.html", null),
        new Advantage('Language Talent', false, 10, "When you learn a language you automatically reach next higher level", "language.html", null),
        new Advantage('Luck', false, 15, "1 reroll per hour.", "luck.html", null),
        new Advantage('Extraordinary Luck', false, 30, "1 reroll per 30 minutes.", "luck.html", null),
        new Advantage('Ridiculous Luck', false, 60, "1 reroll per 10 minutes.", "luck.html", null),
        new Advantage('Night Vision', true, 1, "Ignore -1 / level malus in darkness.", "luck.html", null),
        new Advantage('Perfect Balance', false, 15, "+6 to keep balance. +4 to DX in combat to keep balance. +1 to Acrobatics and Climbing.", "perfectbalance.html", null),
        new Advantage('Resistant to Disease Minor', false, 3, "+3 to HT rolls vs diseases.", "resistant.html", null),
        new Advantage('Resistant to Disease Major', false, 5, "+8 to HT rolls vs diseases.", "resistant.html", null),
        new Advantage('Resistant to Poison Minor', false, 3, "+3 to HT rolls vs poisons.", "resistant.html", null),
        new Advantage('Resistant to Poison Major', false, 5, "+8 to HT rolls vs poisons.", "resistant.html", null),
        new Advantage('Talent', false, 0, "Talk to MJ for bonus on specific skills", "talent.html", null),
    ];

    Advantage.str_to_object = function (name) {
      for (var i = 0; i < advantageTable.length; ++i) {
          if (advantageTable[i].name == name) {
              return advantageTable[i];
          }
      }
      return null;
    };

    AdvantageInstance.prototype.to_advg = function () {
        return Advantage.str_to_object(this.name);
    };

    Advantage.instance = function (name, level) {
        return new AdvantageInstance(name, level);
    };

    Advantage.instances_to_advglist = function(instances) {
        var result = [];
        for (var index = 0; index < instances.length; ++index) {
            var advg = Advantage.str_to_object(instances[index].name);
            advg.level = instances[index].level;
            result.push(advg);
        }
        return result;
    }

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    Advantage.advantages = angular.copy(advantageTable);

    /**
     * Return the constructor function
     */
    return Advantage;
});