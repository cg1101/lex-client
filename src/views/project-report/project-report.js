var mod = angular.module('at.views.project-report', []);

mod.controller('ProjectReportCtrl', function ($scope) {
});

mod.config(function ($stateProvider) {
    $stateProvider.state('project_report', {
        url: '/project-report',
        templateUrl: '/static/html/views/project-report/project-report.html',
        controller: 'ProjectReportCtrl as ctrl'
    });
});
