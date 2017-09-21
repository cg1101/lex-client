var mod = angular.module('at.views.admin', []);

mod.controller('AdminCtrl', function ($scope) {
    $scope.title = 'Welcome, please choose what you want to do!';
});

mod.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '/static/html/views/admin/admin.html',
        controller: 'AdminCtrl as ctrl'
    });
});
