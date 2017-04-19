/**
 * Created by lelabo on 05/04/17.
 */
var app = angular.module('gurps-online', ['ui.router', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngResource', 'LocalStorageModule']);

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
    $stateProvider
        .state('home', {
            url: '/',

            views: {

                '@': {
                    templateUrl: 'views/home.view.html',
                    controller: 'appCtrl as vm'
                },
                'content@home': {
                    templateUrl: 'views/gettingstarted.view.html'
                }
            }
        })
        .state('home.beers', {
            url: 'beers',
            abstract: true
        })
        .state('home.beers.ipas', {
            url: '/ipas',

            views: {

                'content@home': {
                    templateUrl: 'views/beers.ipas.view.html'
                }
            }
        })
        .state('home.beers.porters', {
            url: '/porters',

            views: {

                'content@home': {
                    templateUrl: 'views/beers.porters.view.html'
                }
            }
        })
        .state('home.beers.wheat', {
            url: '/porters',

            views: {

                'content@home': {
                    templateUrl: 'views/beers.wheat.view.html'
                }
            }
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


//take all whitespace out of string
app.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});

//replace uppercase to regular case
app.filter('humanizeDoc', function () {
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
// app.run(function() {
// });