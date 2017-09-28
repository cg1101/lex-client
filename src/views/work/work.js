var mod = angular.module('at.views.work', []);

mod.controller('WorkCtrl', function ($scope, batchId, $q, Lex, $filter, $log) {

    var validators = [],
        fullAlphabets = {};

    (function init(delay) {
        $scope.context = {isLoading: true};
        $scope.batchId = batchId;
        $scope.items = [];
        $scope.currentItem = null;
        $scope.alphabets = [];
        $scope.tags = [];

        var taskId = 30034500;

        $q.all({
            batch: Lex.getBatch(batchId),
            tags: Lex.getTaskTags(taskId),
            alphabets: Lex.getAlphabets()
        }).then(function (result) {
            var batch = result.batch.data.batch,
                items = $filter('orderBy')(batch.data, ['headword', 'ranking']),
                itemByHeadword = {};

            $scope.alphabets = result.alphabets.data.alphabets;
            $scope.tags = result.tags.data.tags;
            // $log.debug('loaded tags', result.tags.data.tags);

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

    function saveCurrentThenGoTo(item) {
        var currentItem = $scope.currentItem,
            formInput = $scope.formInput,
            nextItem, variant;

        $log.debug('save current edited item, spellingCorrection, sampa, tag, etc.');

        $q.resolve(true).then(function () {
            if (currentItem) {
                $log.debug('save formInput', formInput, 'into current item', currentItem);
                currentItem.spellingCorrection = formInput.spellingCorrection;
                currentItem.variants.length = 0;
                angular.forEach(formInput.variants, function (v) {
                    if (v.sampa.search(/\S/) >= 0) {
                        variant = angular.extend({}, v);
                        currentItem.variants.push(variant);
                    }
                });
                $log.debug('after saving', currentItem);

                if (currentItem != item) {
                    $scope.currentItem = item;
                }
            }
        });
    }

    $scope.$watch('currentItem', function (item) {
        var formInput = $scope.formInput = {};
        if (item) {
            formInput.headword = item.headword;
            formInput.spellingCorrection = item.spellingCorrection;
            formInput.sampa = item.sampa;
            formInput.tag = item.tag;
            formInput.variants = item.variants.slice()
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
    $scope.addVariant = function () {
        $scope.formInput.variants.push({
            sampa: '',
            tag: null,
            comment: null
        });
    };
    $scope.isSampaOkay = function (sampa) {
        return /\S/.test(sampa);
    };
    $scope.jumpTo = function (item) {
        var currentItem = $scope.currentItem;
        if (currentItem) {
            saveCurrentThenGoTo(item);
        }
    };
    $scope.save = function () {
        var currentItem = $scope.currentItem, item;
        if (currentItem) {
            item = $scope.items[currentItem.index + 1];
            if (!item) {
                item = currentItem;
            }
            saveCurrentThenGoTo(item);
        }
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
