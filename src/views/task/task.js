var mod = angular.module('at.views.task', []);

mod.controller('TaskCtrl', function ($scope, Lex, $q, taskId, $log) {

    $scope.inputBuffer = [{filename: 'test', type: 'text/plain', data: 'text test'}];

    (function init(delay) {
        $scope.context = {isLoading: true};

        $q.all({
            task: Lex.getTask(taskId)
        }).then(function (result) {
            $scope.task = result.task.data.task;
        }).finally(function () {
            delete $scope.context.isLoading;
        });

        Lex.getTaskSubTasks(taskId).then(function (response) {
            $scope.subTasks = response.data.subTasks;
        })
    })(0);

    $scope.$watchCollection('inputBuffer', function (dataBuffer) {
        $log.debug('inputBuffer changed', dataBuffer);
    });

    $scope.dataLoaded = function (filename, type, data) {
        $log.debug('task.dataLoaded is running', arguments);
        $scope.inputBuffer.push({
            filename: filename,
            type: type,
            data: data
        });
        $log.debug('$scope.inputBuffer length after running dataLoaded:', $scope.inputBuffer.length);
        $log.debug('$scope.inputBuffer after running dataLoaded:', $scope.inputBuffer);
    };
    $scope.getDataPacks = function () {
        return $scope.inputBuffer.slice();
    };
});

mod.config(function ($stateProvider) {
    $stateProvider.state('task', {
        url: '/tasks/{taskId:[0-9]+}',
        templateUrl: '/static/html/views/task/task.html',
        resolve: {
            taskId: function ($stateParams) {
                return $stateParams.taskId;
            }
        },
        controller: 'TaskCtrl as ctrl'
    });
});
