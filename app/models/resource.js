/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Resource',
    function(AppearancesService, AdvantagesService, DisdvantagesService, PosturesService, SkillsService, WealthsService) {

    /**
     * Constructor, with class name
     */
    function Resource() {
    }

    Resource.init = function () {
        Resource.appearances = AppearancesService.all();
        Resource.advantages = AdvantagesService.all();
        Resource.disadvantages = DisdvantagesService.all();
        Resource.postures = PosturesService.all();
        Resource.skills = SkillsService.all();
        Resource.wealths = WealthsService.all();
    };

    return Resource;
});