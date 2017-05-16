/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Reputation', function() {

    /**
     * Constructor, with class name
     */
    function Reputation(what, bonus) {
        this.what = what;
        this.bonus = bonus;
    }

    /**
     * Return the constructor function
     */
    return Reputation;
});