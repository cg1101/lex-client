var mod = angular.module('at.views.task', []);

mod.controller('TaskCtrl', function ($scope, Lex, $q, taskId, $log) {

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
