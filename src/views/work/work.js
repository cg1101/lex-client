var mod = angular.module('at.views.work', []);

mod.controller('WorkCtrl', function ($scope, batchId, $q, Lex) {
    (function init(delay) {
        $scope.batchId = batchId;
        $q.all({
            batch: Lex.getBatch(batchId)
        }).then(function (result) {
            $scope.batch = result.batch.data.batch;
        })
    })(0);
});

mod.config(function ($stateProvider) {
    $stateProvider.state('work', {
        url: '/do/{batchId:[0-9]+}',
        templateUrl: '/static/html/views/work/work.html',
        resolve: {
            batchId: function ($stateParams) {
                return $stateParams.batchId;
            }
        },
        controller: 'WorkCtrl as ctrl'
    });
});
