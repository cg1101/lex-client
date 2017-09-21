var mod = angular.module('at.views.project', []);

mod.controller('ProjectCtrl', function ($scope, projectId, Lex) {

    Lex.getProject(projectId).then(function (response) {
        $scope.project = response.data.project;
    });
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
