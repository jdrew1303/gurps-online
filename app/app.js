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
        .state('home', {
            url: '/',
            views: {

                '@': {
                    templateUrl: 'views/menu/menu.html',
                    controller: 'menuCtrl as vm'
                },
                'content@home': {
                    templateUrl: 'views/home/home.html'
                }
            }
        })
        .state('home.characters', {
            url: 'characters',
            abstract: true
        })
        .state('home.characters.menu', {
            url: '/menu',
            views: {
                'content@home': {
                    templateUrl: 'views/characters/menu.html',
                    controller: 'charactersMenuCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/login');
});