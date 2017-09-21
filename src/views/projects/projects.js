var mod = angular.module('at.views.projects', []);

mod.controller('ProjectsCtrl', function ($scope, Lex, $q, $filter) {

    $scope.title = 'Projects';
    $scope.projects = [];

    (function (delay) {
        $scope.context = {isLoading: true};
        $q.all({
            projects: Lex.getProjects(),
            _timer: Lex.getFakeResponse(delay)
        }).then(function (result) {
            var projects = result.projects.data.projects;
            $scope.projects = $filter('orderBy')(projects, ['projectId', 'name']);
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    this.getProjects = function (isActive) {
        if (angular.isUndefined(isActive)) {
            return $scope.projects;
        } else {
            return $filter('filter')($scope.projects, function (project) {
                return project.current === isActive;
            }, true);
        }
    };
});

mod.config(function ($stateProvider) {
    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: '/static/html/views/projects/projects.html',
        controller: 'ProjectsCtrl as ctrl'
    });
});
