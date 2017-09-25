var mod = angular.module('at.views.project', []);

mod.controller('ProjectCtrl', function ($scope, projectId, Lex, $q, $log) {

    (function init(delay) {
        $scope.context = {isLoading: true};
        $scope.formInput = {};
        $q.all({
            project: Lex.getProject(projectId),
            tasks: Lex.getProjectTasks(projectId)
        }).then(function (result) {
            $scope.project = result.project.data.project;
            $scope.tasks = result.tasks.data.tasks;
            $log.debug($scope.tasks)
        }).finally(function () {
            delete $scope.context.isLoading;
        })
    })(0);
});

mod.config(function ($stateProvider) {
    $stateProvider.state('project', {
        url: '/projects/{projectId:[0-9]+}',
        templateUrl: '/static/html/views/project/project.html',
        resolve: {
            projectId: function ($stateParams) {
                return $stateParams.projectId;
            }
        },
        controller: 'ProjectCtrl as ctrl'
    });
});
