var mod = angular.module('at.components.at-header-bar', []);

mod.controller('HeaderBarCtrl', function ($scope) {
});

mod.directive('atHeaderBar', function () {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: '/static/html/components/at-header-bar/at-header-bar.html',
        controller: 'HeaderBarCtrl as ctrl'
    };
});
