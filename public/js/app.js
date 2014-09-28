'use strict';

var ticTacToeApp = angular.module('myApp', ['ngResource', 'ngRoute'])
    .config(function ($routeProvider) {
        MobileDeviceChecker.hideFooterIfOnMobileDevice();

        $routeProvider
            .when('/', {
                templateUrl: 'views/games.html'
            })
            .when('/games/', {
                templateUrl: 'views/games.html'
            })
            .when('/game/create', {
                templateUrl: 'views/create-game.html'
            })
            .when('/game/:id', {
                templateUrl: 'views/game-status.html'
            })
            .when('/scores/', {
                templateUrl: 'views/scores.html'
            })
            .when('/users/', {
                templateUrl: 'views/users.html'
            })
            .when('/login', {
                templateUrl: 'views/auth-login.html'
            })
            .when('/registration', {
                templateUrl: 'views/auth-registration.html'
            })
            .otherwise({redirectTo: '/'});
    })
    .constant('toastr', toastr)
    .constant('baseServiceUrl', 'http://tic-tac-toe-webapp.apphb.com');