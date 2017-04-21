/**
 * Created by lelabo on 21/04/17.
 */
angular.module('gurps-online').controller('homeCtrl', function($scope, $timeout, AuthService, UserService, User) {
    console.log('Connected:');
    console.log(AuthService.connected());
    UserService.about().then(function (success) {
            console.log(User.from_response(success));
        },
        function (error) {
            console.log(error)
        });

});
