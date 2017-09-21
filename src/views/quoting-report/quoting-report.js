var mod = angular.module('at.views.quoting-report', []);

mod.controller('QuotingReportCtrl', function ($scope) {
});

mod.config(function ($stateProvider) {
    $stateProvider.state('quoting_report', {
        url: '/quoting-report',
        templateUrl: '/static/html/views/quoting-report/quoting-report.html',
        controller: 'QuotingReportCtrl as ctrl'
    });
});
