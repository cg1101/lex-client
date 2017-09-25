var mod = angular.module('at.views.work', []);

mod.controller('WorkCtrl', function ($scope, batchId, $q, Lex, $filter, $log) {

    (function init(delay) {
        $scope.context = {isLoading: true};
        $scope.batchId = batchId;
        $scope.items = [];
        $scope.currentItem = null;

        $q.all({
            batch: Lex.getBatch(batchId)
        }).then(function (result) {
            var batch = result.batch.data.batch,
                items = $filter('orderBy')(batch.data, ['headword', 'ranking']);

            $scope.batch = batch;
            angular.forEach(items, function (item, i) {
                item.index = i;
                item.spellingCorrection = item.headword;
                $scope.items.push(item);
            });
            if (items.length) {
                $scope.currentItem = $scope.items[0];
            }
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    $scope.getItemsBehind = function () {
        var rs = [];
        if ($scope.currentItem) {
            rs = $filter('filter')($scope.items, function (item) {
                return item.index < $scope.currentItem.index;
            }, true);
        }
        return rs;
    };
    $scope.getItemsAhead = function () {
        var rs = $scope.items;
        if ($scope.currentItem) {
            rs = $filter('filter')($scope.items, function (item) {
                return item.index > $scope.currentItem.index;
            }, true);
        }
        return rs;
    };
    $scope.setCurrentItem = function (item) {
        $scope.currentItem = item;
    };
    $scope.$watch('currentItem', function (item) {
        $scope.formInput = {};
        if (item) {
            $scope.formInput.spellingCorrection = item.spellingCorrection;
            $scope.formInput.sampa = item.sampa;
            $scope.formInput.tag = item.tag;
        }
    });
    $scope.save = function () {
        $log.debug('save current edited item, spellingCorrection, sampa, tag, etc.');
    };
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
