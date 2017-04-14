/**
 * Created by lelabo on 05/04/17.
 */
var app = angular.module('gurps-online', ['ui.router', 'ngMaterial', 'ngResource', 'LocalStorageModule']);

app.constant("global", {
    "api_dev": "http://localhost:4000/api",
});

app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
            // onEnter: onUnSecureEnter
        })
        .state('app', {
            url: '/',
            templateUrl: 'views/app/app.html',
            controller: 'appCtrl',
        });

    $urlRouterProvider.otherwise('/login');
    // $stateProvider
    // // route for the home page
    //     .when('/', {
    //         templateUrl : 'views/login/login.html',
    //         controller  : 'loginCtrl'
    //     })
    //     // route for the about page
    //     .when('/home', {
    //         templateUrl : 'views/home.html',
    //         controller  : 'mainController'
    //     })
    //     .otherwise({redirectTo : '/login'});
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