/**
 * Created by lelabo on 05/04/17.
 */
var app = angular.module('gurps-online',
    ['ui.router', 'ngMaterial', 'ngAria', 'ngAnimate', 'ngResource',
    'LocalStorageModule']);

app.constant("global", {
    "api_dev": "http://localhost:4000/api",
});

app.run(function ($q) {
    window.Promise = $q;
});

app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');

    function onSecureEnter($location, AuthService) {
        if (!AuthService.connected()) {
            $location.path('/login');
        }
    }
    function onUnSecureEnter($location, AuthService) {
        if (AuthService.connected()) {
            $location.path('/');
        }
    }

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
            onEnter: onUnSecureEnter
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
                    onEnter: onSecureEnter
                }
            },
        })
        .state('app.characters', {
            url: '/characters',
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
        });

    $urlRouterProvider.otherwise('/login');
});