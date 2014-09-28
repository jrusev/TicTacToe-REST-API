'use strict';

ticTacToeApp.controller('MainPageController',
    function MainPageController($scope, $rootScope, auth) {
        
        if (auth.isAuthenticated()) {
            $rootScope.isLoggedIn = true;
            $rootScope.username = auth.getUsername();
        }        
        
        $scope.toggleFooter = function toggleFooter() {
            $scope.showFooter = !$scope.showFooter;
            $scope.toggleFooterText = $scope.showFooter ? 'Hide footer' : 'Show footer';
        }
        
        $scope.toggleFooter();
    }
);