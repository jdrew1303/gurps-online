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
        new Disadvantage('Acute Hearing', 2, "+1 to Hearing rolls", "senses.html", null),
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