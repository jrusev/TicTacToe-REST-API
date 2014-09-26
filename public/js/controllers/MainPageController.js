'use strict';

ticTacToeApp.controller('MainPageController',
    function MainPageController($scope, $rootScope, author, copyright, auth) {
        $scope.author = author;
        $scope.copyright = copyright;
        //$scope.isSearchInputShown = true;

        if (auth.isAuthenticated()) {
            $rootScope.isLoggedIn = true;
            $rootScope.username = auth.getUsername();
        }
    }
);