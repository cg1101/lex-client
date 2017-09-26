var mod = angular.module('at.views.task', []);

mod.controller('TaskCtrl', function ($scope, Lex, $q, taskId, $log, $timeout) {

    (function init(delay) {
        $scope.context = {isLoading: true};
        $scope.dataBuffer = [];

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

    $scope.getDataTabTitle = function (i) {
        return 'filename: ' + (i.filename || 'n/a') + '\n' +
            'type: ' + (i.type || 'n/a') + '\n' +
            'size: ' + i.size;
    };
    $scope.closeDataTab = function (index) {
        $log.debug('trying to delete tab #' + index);
        $timeout(function () {
            var newIndex = $scope.tabIndex;
            if (confirm('Do you want to close this tab?')) {
                $scope.dataBuffer.splice(index, 1);
            }
        });
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
