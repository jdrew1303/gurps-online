/**
 * Created by lelabo on 05/04/17.
 */
var app = angular.module('gurps-online',
    ['ui.router', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngResource', 'md.data.table',
    'LocalStorageModule']);

app.constant("global", {
    "api_dev": "http://localhost:4000/api",
});

app.config(function($stateProvider, $httpProvider, $urlRouterProvider, $mdThemingProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');

    function onSecureEnter($location, AuthService) {
        if (!AuthService.connected()) {
            $location.path('/login');
        }
    }
    // function onUnSecureEnter($location, AuthService) {
    //     if (AuthService.connected()) {
    //         $location.path('/');
    //     }
    // }

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
            // onEnter: onUnSecureEnter
        })
        .state('app', {
            url: '/',
            views: {

                '@': {
                    templateUrl: 'views/menu/menu.html',
                    controller: 'menuCtrl as vm'
                },
                'content@app': {
                    templateUrl: 'views/home/home.html',
                    controller: 'homeCtrl',
                    // onEnter: onSecureEnter
                }
            },
        })
        .state('app.characters', {
            url: '^/characters',
            abstract: true
        })
        .state('app.characters.menu', {
            url: '/menu',
            views: {
                'content@app': {
                    templateUrl: 'views/characters/menu.html',
                    controller: 'charactersMenuCtrl'
                }
            }
        })
        .state('app.characters.new', {
            url: '/new',
            views: {
                'content@app': {
                    templateUrl: 'views/characters/new.html',
                    controller: 'charactersNewCtrl'
                }
            }
        })
        .state('app.characters.profile', {
            url: '/profile/:characterId',
            views: {
                'content@app': {
                    templateUrl: 'views/characters/profile.html',
                    controller: 'charactersProfileCtrl'
                }
            }
        })
        .state('app.characters.actions', {
            url: '/actions/:characterId',
            views: {
                'content@app': {
                    templateUrl: 'views/characters/actions.html',
                    controller: 'charactersActionCtrl'
                }
            }
        })
        .state('app.campaigns', {
            url: '^/campaigns',
            abstract: true
        })
        .state('app.campaigns.menu', {
            url: '/menu',
            views: {
                'content@app': {
                    templateUrl: 'views/campaigns/menu.html',
                    controller: 'campaignsMenuCtrl'
                }
            }
        })
        .state('app.campaigns.new', {
            url: '/new',
            views: {
                'content@app': {
                    templateUrl: 'views/campaigns/new.html',
                    controller: 'campaignsNewCtrl'
                }
            }
        })
        .state('app.campaigns.profile', {
            url: '/profile/:campaignId',
            views: {
                'content@app': {
                    templateUrl: 'views/campaigns/profile.html',
                    controller: 'campaignsProfileCtrl'
                }
            }
        });


    $urlRouterProvider.otherwise('/login');
});

app.run(function(Resource) {
    Resource.init();
    Resource.appearances.then(function (data) {
        console.log(data)
    });
    console.log(Resource.advantages);
    console.log(Resource.disadvantages);
    console.log(Resource.postures);
    console.log(Resource.skills);
    console.log(Resource.wealths);
    console.log("INIT");
});