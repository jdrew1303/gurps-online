/**
 * Created by lelabo on 21/04/17.
 */
angular.module('gurps-online').factory('User', function() {

    /**
     * Constructor, with class name
     */
    function User(id, username, email, admin) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.admin = admin;
    }

    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    User.from_response = function (data) {
        return new User(
            data._id,
            data.username,
            data.mail,
            data.admin,
        );
    };

    /**
     * Return the constructor function
     */
    return User;
});