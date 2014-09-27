'use strict';

ticTacToeApp.controller('LogoutController',
    function LogoutController($rootScope, $scope, $resource, $location, ticTacToeData, auth) {
        if (!auth.isAuthenticated()) {
            $location.path('/');
            return;
        }
        
        $scope.logout = function () {            
            ticTacToeData.logout(auth.access_token())
                .then(function () {
                    auth.logout();                    
                    $rootScope.isLoggedIn = false;
                    $location.path('/login');                    
                }, function (data) {
                    ModalDialog.show("The request is invalid.", data.error_description);
                });
        }
    }
);
