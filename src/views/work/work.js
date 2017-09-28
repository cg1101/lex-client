var mod = angular.module('at.views.work', []);

mod.controller('WorkCtrl', function ($scope, batchId, $q, Lex, $filter, $log) {

    var validators = [],
        fullAlphabets = {};

    function parseAlphabet(alphabet) {
        $log.debug('loaded alphabet', alphabet);
        fullAlphabets[alphabet.alphabetId] = alphabet;
        alphabet.validators = [];
        angular.forEach(alphabet.phonologyRules, function (rule) {
            $log.debug(rule);
        });
        angular.forEach(alphabet.stressRules, function (rule) {
            $log.debug(rule);
        });
        angular.forEach(alphabet.syllabificationRules, function (rule) {
            $log.debug(rule);
        });
        angular.forEach(alphabet.vowelisationRules, function (rule) {
            $log.debug(rule);
        });
    }

    (function init(delay) {
        $scope.context = {isLoading: true};
        $scope.batchId = batchId;
        $scope.items = [];
        $scope.currentItem = null;
        $scope.alphabets = [];

        $q.all({
            batch: Lex.getBatch(batchId),
            alphabets: Lex.getAlphabets()
        }).then(function (result) {
            var batch = result.batch.data.batch,
                items = $filter('orderBy')(batch.data, ['headword', 'ranking']),
                itemByHeadword = {};

            $scope.alphabets = result.alphabets.data.alphabets;

            angular.forEach(items, function (item) {
                var hw = item.headword, newItem;
                if (!angular.isDefined(itemByHeadword[hw])) {
                    newItem = {
                        index: $scope.items.length,
                        headword: hw,
                        spellingCorrection: hw,
                        variants: [
                            {
                                sampa: item.sampa,
                                tag: item.tag
                            }
                        ]
                    };
                    itemByHeadword[hw] = newItem;
                    $scope.items.push(newItem);
                } else {
                    itemByHeadword[hw].variants.push({
                        sampa: item.sampa,
                        tag: item.tag
                    });
                }
            });
            if (items.length) {
                $scope.currentItem = $scope.items[0];
            }
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    $scope.$watch('currentItem', function (item) {
        $scope.formInput = {};
        if (item) {
            $scope.formInput.spellingCorrection = item.spellingCorrection;
            $scope.formInput.sampa = item.sampa;
            $scope.formInput.tag = item.tag;
            $scope.formInput.variants = item.variants.slice()
        }
    });
    $scope.$watch('alphabetId', function (alphabetId) {
        validators.length = 0;
        if (angular.isNumber(alphabetId)) {
            $log.debug('chosen alphabet', alphabetId);
            if (angular.isDefined(fullAlphabets[alphabetId])) {
                validators.concat(fullAlphabets[alphabetId].validators)
            } else {
                Lex.getAlphabet(alphabetId).then(function (response) {
                    var alphabet = response.data.alphabet;
                    parseAlphabet(alphabet);
                    validators.concat(alphabet.validators);
                });
            }
        }
    });
    $scope.getItemsBehind = function () {
        var rs = [];
        if ($scope.currentItem) {
            rs = $filter('filter')($scope.items, function (item) {
                return item.index < $scope.currentItem.index;
            }, true);
        }
        return rs;
    };
    $scope.getItemsAhead = function () {
        var rs = $scope.items;
        if ($scope.currentItem) {
            rs = $filter('filter')($scope.items, function (item) {
                return item.index > $scope.currentItem.index;
            }, true);
        }
        return rs;
    };
    $scope.setCurrentItem = function (item) {
        $scope.currentItem = item;
    };
    $scope.save = function () {
        $log.debug('save current edited item, spellingCorrection, sampa, tag, etc.');
    };
});

mod.config(function ($stateProvider) {
    $stateProvider.state('work', {
        url: '/do/{batchId:[0-9]+}',
        templateUrl: '/static/html/views/work/work.html',
        resolve: {
            batchId: function ($stateParams) {
                return $stateParams.batchId;
            }
        },
        controller: 'WorkCtrl as ctrl'
    });
});
