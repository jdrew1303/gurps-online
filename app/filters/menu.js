/**
 * Created by lelabo on 19/04/17.
 */
//take all whitespace out of string
angular.module('gurps-online').filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});

//replace uppercase to regular case
angular.module('gurps-online').filter('humanizeDoc', function () {
    return function (doc) {
        if (!doc) return;
        if (doc.type === 'directive') {
            return doc.name.replace(/([A-Z])/g, function ($1) {
                return '-' + $1.toLowerCase();
            });
        }
        return doc.label || doc.name;
    };
});