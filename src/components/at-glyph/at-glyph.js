var mod = angular.module('at.components.at-glyph', []);

mod.controller('GlyphCtrl', function ($scope, Linguist) {
    $scope.phone = null;
    $scope.$watch('key', function (key) {
        $scope.phone = null;
        if (key !== null) {
            $scope.phone = Linguist.get(key);
        }
    })
});

mod.directive('atGlyph', function () {
    return {
        restrict: 'EA',
        scope: {
            key: '='
        },
        templateUrl: '/static/html/components/at-glyph/at-glyph.html',
        controller: 'GlyphCtrl as ctrl'
    };
});
