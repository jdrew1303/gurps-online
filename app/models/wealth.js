/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Wealth', function() {

    /**
     * Constructor, with class name
     */
    function Wealth(title, multiplicator, cost) {
        this.name = title;
        this.multiplicator = multiplicator;
        this.cost = cost;
    }


    var wealthTable = [
        new Wealth('Dead Broke', 0, -25),
        new Wealth('Poor', 0.2, -15),
        new Wealth('Struggling', 0.5, -10),
        new Wealth('Average', 1, 0),
        new Wealth('Comfortable', 2, 10),
        new Wealth('Wealthy', 5, 20),
        new Wealth('Very Wealthy', 20, 30),
        new Wealth('Filthy Rich', 100, 50)
    ];

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    Wealth.states = angular.copy(wealthTable);

    /**
     * Return the constructor function
     */
    return Wealth;
});