var mod = angular.module('at.views.user-report', []);

mod.controller('UserReportCtrl', function ($scope) {
});

mod.config(function ($stateProvider) {
    $stateProvider.state('user_report', {
        url: '/user-report',
        templateUrl: '/static/html/views/user-report/user-report.html',
        controller: 'UserReportCtrl as ctrl'
    });
});
