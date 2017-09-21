var mod = angular.module('at.views.pre-processing', []);

mod.controller('PreProcessingCtrl', function ($scope) {
});

mod.config(function ($stateProvider) {
    $stateProvider.state('pre_processing', {
        url: '/pre-processing',
        templateUrl: '/static/html/views/pre-processing/pre-processing.html',
        controller: 'PreProcessingCtrl as ctrl'
    });
});
