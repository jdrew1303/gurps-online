/**
 * Created by lelabo on 21/04/17.
 */
angular.module('gurps-online').controller('homeCtrl', function($scope, AuthService, UserService, MenuService, Disadvantage) {
    MenuService.currentTitle = 'Home';

    for (var i = 0; i < Disadvantage.disadvantages.length; ++i) {
        var advg = Disadvantage.disadvantages[i];
        console.log('{ "name": "' + advg.name + '", "haslevel": ' + advg.haslevel + ', "cost": ' + advg.cost + ', "description": "' + advg.description + '", "info": "' + advg.info + '"}')
    }
    UserService.me(true).then(function (success) {
        console.log(success);
        }, function (error) {
        console.log(error)
        });
});
