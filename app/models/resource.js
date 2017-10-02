/**
 * Created by lelabo on 05/05/17.
 */
angular.module('gurps-online').factory('Resource',
    function(Appearance, AdvantagesService, DisdvantagesService, PosturesService, SkillsService, WealthsService,
    DamagesService) {

    var self = this;

    self.init = function () {
        Appearance.init();
        self.appearances = Appearance.promise;
        self.advantages = AdvantagesService.all();
        self.disadvantages = DisdvantagesService.all();
        self.postures = PosturesService.all();
        self.skills = SkillsService.all();
        self.wealths = WealthsService.all();
        self.damages = DamagesService.all()
    };

    return self;
});