'use strict';

ticTacToeApp.controller('ListGamesController',
    function ListGamesController($rootScope, $scope, $location, $window, ticTacToeData, auth) {
        if (!auth.isAuthenticated()) {
            $location.path('/login');
            return;
        }

        $scope.currentPlayer = $rootScope.username;
        $scope.allMyGames = [];

        // g.SecondPlayerId == userId && (g.State == TurnO || g.State == TurnX)
        function getJoinedGames() {
            ticTacToeData
                .getJoinedGames(auth.access_token())
                .then(function (data) {
                    $scope.joinedGames = data;
                    $scope.allMyGames = $scope.allMyGames.concat(data);
                });
        }
        
        // g.State == WaitingForSecondPlayer && g.FirstPlayerId != userId
        function getAvailableGames() {
            ticTacToeData
                .getAvailableGames(auth.access_token())
                .then(function (data) {
                    $scope.availableGames = data;
                    $scope.allMyGames = $scope.allMyGames.concat(data);
                });
        }
        
        // g.FirstPlayerId == userId || (g.SecondPlayerId == userId && (g.State == WonByX || g.State == WonByO || g.State == Draw))
        ticTacToeData
            .getMyGames(auth.access_token())
            .then(function (data) {
                $scope.myGames = [];
                data.forEach(function(game) {
                    if (game.Status >= 0 ) // WonByX, WonByO or Draw
                        $scope.myGames.push(game);
                });
            });
        
        ticTacToeData
            .getMyGamesHistory(auth.access_token())
            .then(function (data) {
                $scope.myGamesHistory = data;
            });

        getJoinedGames();
        getAvailableGames();
        
        $scope.joinGame = function (gameId) {
            ticTacToeData
                .joinGame(gameId, auth.access_token())
                .then(function () {
                    $scope.allMyGames = [];
                    getJoinedGames();
                    getAvailableGames();
                });
        };
        
        $scope.playGame = function (gameId) {
            $location.path('/game/' + gameId);
        };
        
        $scope.playMyGame = function(gameId, status) {
            if (status == 0)
                $scope.joinGame(gameId);
            else
                $scope.playGame(gameId);
        };
    }
);