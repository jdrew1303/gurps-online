/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Resource', function(AppearancesService) {

    /**
     * Constructor, with class name
     */
    function Resource() {
    }

    Resource.init = function () {
        Resource.appearances = AppearancesService.all()
    };

    return Resource;
});