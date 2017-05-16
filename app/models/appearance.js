/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Appearance', function() {

    /**
     * Constructor, with class name
     */
    function Appearance(name, reaction, samesex, cost) {
        this.name = name;
        this.reaction = reaction;
        this.samesex = samesex;
        this.cost = cost;
    }


    var appearanceTable = [
        new Appearance('Hideous', -4, 0, -16),
        new Appearance('Ugly', -2, 0, -8),
        new Appearance('Unattractive', -1, 0, -4),
        new Appearance('Average', 0, 0, 0),
        new Appearance('Attractive', 1, 0, 4),
        new Appearance('Handsome', 2, 4, 12),
        new Appearance('Very Handsome', 2, 6, 16)
    ];

    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    Appearance.states = angular.copy(appearanceTable);

    /**
     * Return the constructor function
     */
    return Appearance;
});