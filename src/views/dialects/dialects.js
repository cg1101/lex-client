var mod = angular.module('at.views.dialects', []);

mod.controller('DialectsCtrl', function ($scope, Lex, $q) {

    $scope.title = 'Languages / Dialects';

    (function (delay) {
        $scope.context = {isLoading: true};
        $q.all({
            dialects: Lex.getDialects(),
            _timer: Lex.getFakeResponse(delay)
        }).then(function (result) {
            $scope.dialects = result.dialects.data.dialects;
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    this.getScriptLabel = function (script) {
        var s = script;
        return s.scriptCode + '-' + s.scriptNumber + ' ' + s.name;
    };
});

mod.config(function ($stateProvider) {
    $stateProvider.state('dialects', {
        url: '/dialects',
        templateUrl: '/static/html/views/dialects/dialects.html',
        controller: 'DialectsCtrl as ctrl'
    });
});
