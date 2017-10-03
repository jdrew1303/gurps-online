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

    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        };
    }

    function IsNotConnected($location, AuthService) {
        if (!AuthService.connected()) {
            $location.path('/login');
        }
    }
    function IsConnected($location, AuthService) {
        console.log("PLOP");
        if (AuthService.connected()) {
            $location.path('/');
        }
    }

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
            onEnter: IsConnected
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
                    onEnter: IsNotConnected
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
                    templateUrl: 'views/characters/profile/profile.html',
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

app.run(function(Resource, Damage, Habits) {
    Resource.init();
    Damage.init();
    Habits.init();
});