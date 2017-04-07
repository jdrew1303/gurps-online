/**
 * Created by lelabo on 05/04/17.
 */
var app = angular.module('gurps-online', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl : 'views/login/login.html',
            controller  : 'loginCtrl'
        })
        // route for the about page
        .when('/about', {
            templateUrl : 'views/about.html',
            controller  : 'aboutController'
        })
        // route for the contact page
        .when('/contact', {
            templateUrl : 'views/contact.html',
            controller  : 'contactController'
        })
        .when('/login', {
            templateUrl : 'views/login/login.html',
            controller  : 'loginCtrl'
        })
        .otherwise({redirectTo : '/login'});
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {
    // create a message to display in our views
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

app.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

// app.run(function() {
// });