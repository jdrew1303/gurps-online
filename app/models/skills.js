/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Advantage', function() {

    /**
     * Constructor, with class name
     */
    function Advantage(name, level, max, cost, desc, info, action) {
        this.name = name;
        this.level = level;
        this.cost = cost;
        this.desc = desc;
        this.action = action;
    }


    var advantageTable = [
        new Advantage('Acute Hearing', 0, 2, "+1 to Hearing rolls", "senses.html", null),
        new Advantage('Acute Taste and Smell', 0, 2, "+1 to Taste and Smell rolls", "senses.html", null),
        new Advantage('Acute Touch', 0, 2, "+1 to Touch rolls", "senses.html", null),
        new Advantage('Acute Vision', 0, 2, "+1 to Vision rolls", "senses.html", null),
        new Advantage('Ambidexterity', null, 5, "No wrong hand malus.", "ambidexterity.html", null),
        new Advantage('Animal Empathy', null, 5, "Reveals beast emotionnal state and Influence them.", "animalempathy.html", null),
        new Advantage('Catfall', null, 10, "Fall < 4.572 = Automatic Success", "catfall.html", null),
        new Advantage('Combat Reflexes', null, 15, "+1 to active defense / +2 Fright Checks / +6 IQ vs stun, wake up, surprise.", "combatreflexes.html", null),
        new Advantage('Danger Sense', null, 15, "GM rolls against Perception. Success = warning.", "dangersense.html", null),
        new Advantage('Daredevil', null, 15, "Reveal NPC emotion on first contact.", "empathy.html", null),
        new Advantage('Enhanced Block', 0, 5, "+1/level to block with shield skill.", "defenses.html", null),
        new Advantage('Enhanced Dodge', 0, 15, "+1/level to dodge.", "defenses.html", null),
        new Advantage('Enhanced Parry Melee', 0, 5, "+1/level for bare hands or melee weapons", "defenses.html", null),
        new Advantage('Enhanced Parry All', 0, 10, "+1/level for all parries", "defenses.html", null),
        new Advantage('Fearlessness', 0, 2, "Bonus on Fright Check or Intimidation.", "fearlessness.html", null),
        new Advantage('Flexibility', null, 5, "+3 on Climbing, on Escape. Ignore -3 for working in close spaces.", "flexibility.html", null),
        new Advantage('Double-Jointed', null, 15, "+5 on Climbing, on Escape. Ignore -5 for working in close spaces.", "flexibility.html", null),
        new Advantage('Hard to Kill', 0, 2, "+1 to HT roll for survival.", "hardtokill.html", null),
        new Advantage('High Pain Threshold', 0, 10, "+3 on HT roll vs knockdown, stunning, torturing. Will+3 to ignore pain.", "hardtokill.html", null),
        new Advantage('Jumper (Time)', null, 100, "Travel through time.", "jumper.html", null),
        new Advantage('Jumper (Space)', null, 100, "Travel through space.", "jumper.html", null),
        new Advantage('Language Talent', null, 10, "When you learn a language you automatically reach next higher level", "language.html", null),
        new Advantage('Luck', null, 15, "1 reroll per hour.", "luck.html", null),
        new Advantage('Extraordinary Luck', null, 30, "1 reroll per 30 minutes.", "luck.html", null),
        new Advantage('Ridiculous Luck', null, 60, "1 reroll per 10 minutes.", "luck.html", null),
        new Advantage('Night Vision', 0, 1, "Ignore -1 / level malus in darkness.", "luck.html", null),
        new Advantage('Perfect Balance', null, 15, "+6 to keep balance. +4 to DX in combat to keep balance. +1 to Acrobatics and Climbing.", "perfectbalance.html", null),
        new Advantage('Resistant to Disease Minor', null, 3, "+3 to HT rolls vs diseases.", "resistant.html", null),
        new Advantage('Resistant to Disease Major', null, 5, "+8 to HT rolls vs diseases.", "resistant.html", null),
        new Advantage('Resistant to Poison Minor', null, 3, "+3 to HT rolls vs poisons.", "resistant.html", null),
        new Advantage('Resistant to Poison Major', null, 5, "+8 to HT rolls vs poisons.", "resistant.html", null),
        new Advantage('Talent', null, 0, "Talk to MJ for bonus on specific skills", "talent.html", null),
    ];

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    Advantage.list = angular.copy(advantageTable);

    /**
     * Return the constructor function
     */
    return Advantage;
});