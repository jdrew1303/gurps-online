/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Disadvantage', function() {

    /**
     * Constructor, with class name
     */
    function Disadvantage(name, cost, desc, info, action) {
        this.name = name;
        this.cost = cost;
        this.desc = desc;
        this.action = action;
        this.info = info;
    }

    function DisadvantageInstance(name, level) {
        this.name = name;
        this.level = level;
    }

    var disadvantageTable = [
        new Disadvantage('Bad Sight (glass or contact lenses)', 10, "-6 vision rolls / -2 hit in combat", "badsight.html", null),
        new Disadvantage('Bad Sight', 25, "-6 vision rolls / -2 hit in combat", "badsight.html", null),
        new Disadvantage('Bad Temper*', 10, "Self-control roll in any stressful situation", "badtemper.html", null),
        new Disadvantage('Bloodlust*', 10, "Self-control roll whenever you need to accept a surrender, evade a sentry, take a prisoner, etc.", "bloodlust.html", null),
        new Disadvantage('Code of Honor (Pirate)*', 5, "Always avenge an insult; buddy’s foe is your own; never attack partner/buddy except in duel.", "honor.html", null),
        new Disadvantage('Code of Honor (Gentleman)*', 10, "Never break words. Never ignore insults (apology or a duel - death not necessarily). Never take advantage of an opponent (weapons, circumstances - except in open war). Only applies between gentlemen.", "honor.html", null),
        new Disadvantage('Curious*', 5, "self-control roll with interesting item/situation. Fail: examine it even if dangerous.", "curious.html", null),
        new Disadvantage('Minor Delusion', 5, "Affects your behavior, and anyone around you will soon notice it (and react at -1), but it does not keep you from functioning more-or-less normally.", "delusions.html", null),
        new Disadvantage('Major Delusion', 10, "Affects your behavior, but does not keep you from living a fairly normal life. Others will react to you at -2.", "delusions.html", null),
        new Disadvantage('Severe Delusion', 15, "Affects your behavior so much that it may keep you from functioning in the everyday world. Others react to you at -3, but they are more likely to fearor pity you than to attack.", "delusions.html", null),
        new Disadvantage('Gluttony*', 5, "Self-control roll when presented with tempting foof/wine you should resist. Fail: Eat it regardless consequences.", "gluttony.html", null),
        new Disadvantage('Greed*', 15, "Self-control roll any time payment for fair work, gains from adventure, spoils of crime, or just bait. Fail: do whatever it takes to get the payoff. If rich, small sums does not tempt you. If poor, you get -5 or more for rich prize.", "gluttony.html", null),
        new Disadvantage('Hard of Hearing', 10, "-4 on Hearing and skill roll when you need to understand someone (not if your are the one talking).", "hearing.html", null),
        new Disadvantage('Honesty*', 10, " Self-control roll when faced with the “need” to break unreasonable laws. Fail: you must obey the law, whatever the consequences. Success: make a second self-control roll. Fail 2: turn yourself into the authorities!", "honesty.html", null),
        new Disadvantage('Impulsiveness*', 10, "Roleplay it! Make a self-control roll whenever it would be wise to wait and ponder. If you fail, you must act.", "impulsivennes.html", null),
        new Disadvantage('Intolerance (total)*', 10, "You react at -3 toward anyone not of your own class, ethnicity, nationality, religion, or species (pick one).", "intolerance.html", null),
        new Disadvantage('Intolerance (specific class)*', 5, "You react at -3 toward only one specific class, ethnicity, nationality, religion, sex, or species.", "intolerance.html", null),
        new Disadvantage('Intolerance (specific person)*', 1, "You react at -3 toward only one nasty quirk for a rare victim.", "intolerance.html", null),
        new Disadvantage('Jealousy', 10, "You resist any plan proposed by a “rival,” and hate it if someone else is in the limelight", "jealousy.html", null),
        new Disadvantage('Lecherousness*', 15, "Make a self-control roll whenever contact with an appealing member of the sex you find attractive (-5 if Beautiful / -10 if Very Beautiful). If you fail, you must make a “pass,” using whatever wiles and skills you can bring to bear.", "lecherousness.html", null),
        new Disadvantage('Obsession (short-term)*', 5, "Make a self-control roll whenever it would be wise to deviate from your goal. If you fail, you continue to pursue your Obsession, regardless of the consequences.", "obsession.html", null),
        new Disadvantage('Obsession (long-term)*', 10, "Make a self-control roll whenever it would be wise to deviate from your goal. If you fail, you continue to pursue your Obsession, regardless of the consequences.", "obsession.html", null),
        new Disadvantage('Overconfidence*', 5, " +2 reaction rolls from young / naive NPC, -2 experienced NPCs. make a self-control roll any time the GM feels you show an unreasonable degree of caution. If you fail, you must go ahead as though you were able to handle the situation! Caution is not an option", "overconfidence.html", null),
        new Disadvantage('Reluctant Killer', 5, "-4 to hit a person (not a monster, machine, etc.) with a deadly attack (-2 if you can’t see his face). If you kill someone, roll 3d – you’re morose and useless for that many days.", "pacifism.html", null),
        new Disadvantage('Cannot Harm Innocents', 10, "Fights allowed but only use deadly force on a foe attempting to do you serious harm", "pacifism.html", null),
        new Disadvantage('Rare Phobia*', 5, "-2 to IQ/DX and skill rolls while fear is present. Roll every 10 minutes to see if the fear overcomes you. Fail: flee, panic, or react in a manner that prevent action.", "phobias.html", null),
        new Disadvantage('Frequent Phobia*', 10, "-2 to IQ/DX and skill rolls while fear is present. Roll every 10 minutes to see if the fear overcomes you. Fail: flee, panic, or react in a manner that prevent action.", "phobias.html", null),
        new Disadvantage('Common Phobia*', 15, "-2 to IQ/DX and skill rolls while fear is present. Roll every 10 minutes to see if the fear overcomes you. Fail: flee, panic, or react in a manner that prevent action.", "phobias.html", null),
        new Disadvantage('Sense of Duty (Individual)', 2, "You will never betray them, abandon them when they’re in trouble, or let them suffer or go hungry if you can help.", "duty.html", null),
        new Disadvantage('Sense of Duty (Small Group)', 5, "You will never betray them, abandon them when they’re in trouble, or let them suffer or go hungry if you can help.", "duty.html", null),
        new Disadvantage('Sense of Duty (Small Group)', 10, "You will never betray them, abandon them when they’re in trouble, or let them suffer or go hungry if you can help.", "duty.html", null),
        new Disadvantage('Sense of Duty (Race)', 15, "You will never betray them, abandon them when they’re in trouble, or let them suffer or go hungry if you can help.", "duty.html", null),
        new Disadvantage('Sense of Duty (Every Living Being)', 20, "You will never betray them, abandon them when they’re in trouble, or let them suffer or go hungry if you can help.", "duty.html", null),
        new Disadvantage('Truthfulness*', 5, " -5 to Fast-Talk skill, -5 at acting when you try to deceive, make a self-control roll when you should keep silent about truth, -5 when lying. Fail: Your lie is obvious.", "thruthfulness.html", null),
        new Disadvantage('Unluckiness', 10, "Once per play session, the GM will arbitrarily and maliciously make something go wrong for you.", "unluckiness.html", null),
        new Disadvantage('Minor vow', 5, "You have sworn an oath to do (or not to do) something. Whatever the oath, you take it seriously; if you didn’t, it would not be a disadvantage.", "vow.html", null),
        new Disadvantage('Major vow', 10, "You have sworn an oath to do (or not to do) something. Whatever the oath, you take it seriously; if you didn’t, it would not be a disadvantage.", "vow.html", null),
        new Disadvantage('Great vow', 15, "You have sworn an oath to do (or not to do) something. Whatever the oath, you take it seriously; if you didn’t, it would not be a disadvantage.", "vow.html", null),
    ];

    Disadvantage.str_to_object = function (name) {
      for (var i = 0; i < disadvantageTable.length; ++i) {
          if (disadvantageTable[i].name == name) {
              return disadvantageTable[i];
          }
      }
      return null;
    };

    DisadvantageInstance.prototype.to_advg = function () {
        return Disadvantage.str_to_object(this.name);
    };

    Disadvantage.instance = function (name, level) {
        return new DisadvantageInstance(name, level);
    };

    Disadvantage.instances_to_advglist = function(instances) {
        var result = [];
        for (var index = 0; index < instances.length; ++index) {
            var advg = Disadvantage.str_to_object(instances[index].name);
            advg.level = instances[index].level;
            result.push(advg);
        }
        return result;
    }

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    Disadvantage.disadvantages = angular.copy(disadvantageTable);

    /**
     * Return the constructor function
     */
    return Disadvantage;
});