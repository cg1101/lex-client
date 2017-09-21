var app = angular.module('lexApp', [
    'ui.router',
    'ui.bootstrap',
    'at.components',
    'at.dialogs',
    'lex.services',
    'lex.components',
    'at.views'
]);

app.config(function ($urlRouterProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function ($injector, $location) {
        var url = $location.url();
        if (url === '' || url === '/') {
            return '/admin';
        } else if (/\/$/.test(url)) {
            return url.substring(0, url.length - 1);
        }
    });
});

app.run(function ($rootScope, $state, Linguist, $log, $window) {
    $rootScope.$state = $state;
    // $log.debug('Linguist is loaded', Linguist);
    $window.Linguist = Linguist;
});

app.controller('MainCtrl', function ($scope) {
});
