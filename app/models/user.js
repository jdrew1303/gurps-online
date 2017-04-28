/**
 * Created by lelabo on 21/04/17.
 */
angular.module('gurps-online').factory('User', function(Characters) {

    /**
     * Constructor, with class name
     */
    function User(id, username, email, admin, characters) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.admin = admin;
        this.characters = characterJsonToObject(characters);
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
            data.characters,
        );
    };

    /**
     * Private function
     */
    function characterJsonToObject(characters) {
        var result = [];
        for (var i in characters) {
            result.push(Characters.build(characters[i]));
        }
        return result;
    }

    /**
     * Return the constructor function
     */
    return User;
});