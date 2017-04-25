/**
 * Created by lelabo on 21/04/17.
 */
angular.module('gurps-online').controller('homeCtrl', function($scope, AuthService, UserService, MenuService) {
    MenuService.currentTitle = 'Home';
});
