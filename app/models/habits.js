/**
 * Created by lelabo on 09/05/17.
 */
angular.module('gurps-online').factory('OPH', function() {

    /**
     * Constructor, with class name
     */
    function OdiousPersonnalHabits(type, cost) {
        this.title = type;
        this.cost = cost;
    }


    var possibleTypes = [
        new OdiousPersonnalHabits('Minor', 5),
        new OdiousPersonnalHabits('Intermediate', 10),
        new OdiousPersonnalHabits('Major', 15),
    ];

    var typesValues = {
        Minor: 5,
        Intermediate: 10,
        Major: 15,
    };

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    OdiousPersonnalHabits.types = angular.copy(possibleTypes);
    OdiousPersonnalHabits.typevalues = angular.copy(typesValues);

    OdiousPersonnalHabits.build = function (data) {
        return new OdiousPersonnalHabits(
            data.type,
            0
        );
    };

    /**
     * Return the constructor function
     */
    return OdiousPersonnalHabits;
});