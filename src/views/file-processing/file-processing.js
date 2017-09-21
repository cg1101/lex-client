var mod = angular.module('at.views.file-processing', []);

mod.controller('FileProcessingCtrl', function ($scope) {
});

mod.config(function ($stateProvider) {
    $stateProvider.state('file_processing', {
        url: '/file-processing',
        templateUrl: '/static/html/views/file-processing/file-processing.html',
        controller: 'FileProcessingCtrl as ctrl'
    });
});
