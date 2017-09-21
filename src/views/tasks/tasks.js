var mod = angular.module('at.views.tasks', []);

mod.controller('TasksCtrl', function ($scope, Lex, $filter, $q) {

    $scope.title = 'Tasks';
    $scope.tasks = [];
    $scope.projects = [];

    (function (delay) {
        $scope.context = {isLoading: true};
        $q.all({
            tasks: Lex.getTasks(),
            projects: Lex.getProjects(),
            _timer: Lex.getFakeResponse(delay)
        }).then(function (result) {
            var tasks = $scope.tasks = result.tasks.data.tasks,
                projects = $scope.projects = result.projects.data.projects,
                lookup = {};
            angular.forEach(projects, function (project) {
                lookup[project.projectId] = project.current;
            });
            angular.forEach(tasks, function (task) {
                task.current = Boolean(lookup[task.projectId]);
            });
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    this.getTasks = function (isActive) {
        if (angular.isUndefined(isActive)) {
            return $scope.tasks;
        } else {
            return $filter('filter')($scope.tasks, function (task) {
                return task.current === isActive;
            }, true);
        }
    };
});

mod.config(function ($stateProvider) {
    $stateProvider.state('tasks', {
        url: '/tasks',
        templateUrl: '/static/html/views/tasks/tasks.html',
        controller: 'TasksCtrl as ctrl'
    });
});
