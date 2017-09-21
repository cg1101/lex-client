var mod = angular.module('at.views.alphabets', []);

mod.controller('AlphabetsCtrl', function ($scope, Lex, $q) {

    $scope.title = 'Phonetic Alphabets';
    $scope.sortKeys = {
        alphabetId: true
    };
    $scope.sortKey = 'alphabetId';

    (function (delay) {
        $scope.context = {isLoading: true};
        $q.all({
            alphabets: Lex.getAlphabets(),
            _timer: Lex.getFakeResponse(delay)
        }).then(function (result) {
            $scope.alphabets = result.alphabets.data.alphabets;
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);
});

mod.config(function ($stateProvider) {
    $stateProvider.state('alphabets', {
        url: '/alphabets',
        templateUrl: '/static/html/views/alphabets/alphabets.html',
        controller: 'AlphabetsCtrl as ctrl'
    });
});
