var mod = angular.module('at.views.work', []);

mod.controller('WorkCtrl', function ($scope, batchId, $q, Lex, $filter, $log, Linguist) {

    var validators = [],
        validatorById = {},
        fullAlphabets = {};

    (function init(delay) {
        $scope.context = {isLoading: true};
        $scope.batchId = batchId;
        $scope.items = [];
        $scope.currentItem = null;
        $scope.alphabets = [];
        $scope.tags = [];
        $scope.taskTypes = [
            {taskTypeId: 1, name: 'Lexicon'},
            {taskTypeId: 2, name: 'Spelling'},
            {taskTypeId: 3, name: 'Markup'}
        ];
        $scope.taskType = $scope.taskTypes[0];

        var taskId = 30034500;

        $q.all({
            batch: Lex.getBatch(batchId),
            tags: Lex.getTaskTags(taskId),
            alphabets: Lex.getAlphabets()
        }).then(function (result) {
            var batch = result.batch.data.batch,
                items = $filter('orderBy')(batch.data, ['headword', 'ranking']);

            $scope.alphabets = result.alphabets.data.alphabets;
            $scope.tags = result.tags.data.tags;

            items = loadRawItems(items);
            $scope.items = items;
            if (items.length) {
                $scope.currentItem = $scope.items[0];
            }
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    function loadRawItems(rawItems) {
        var itemByHeadword = {}, items = [];
        angular.forEach(rawItems, function (rawItem) {
            var hw = rawItem.headword, newItem;
            if (!angular.isDefined(itemByHeadword[hw])) {
                newItem = {
                    index: items.length,
                    headword: hw,
                    spellingCorrection: hw,
                    variants: [{sampa: rawItem.sampa, tag: rawItem.tag, comment: null}]
                };
                itemByHeadword[hw] = newItem;
                items.push(newItem);
            } else {
                itemByHeadword[hw].variants.push({
                    sampa: rawItem.sampa,
                    tag: rawItem.tag,
                    comment: null
                });
            }
        });
        return items;
    }

    function escape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    function prepareSequencePattern(s) {
        // search for CON/VWL/SYL ...
        return s;
    }

    function parseAlphabet(alphabet) {
        var phones;
        $log.debug('loaded alphabet', alphabet);
        fullAlphabets[alphabet.alphabetId] = alphabet;

        phones = {};
        angular.forEach(alphabet.graphemes, function (gr) {
            var symbol = Linguist.lookup(gr.appenKey);
            // $log.debug(gr, '=>', symbol);
            if (angular.isUndefined(phones[symbol.type])) {
                phones[symbol.type] = [];
            }
            phones[symbol.type].push({grapheme: gr, symbol: symbol});
        });
        alphabet.phones = phones;

        alphabet.validators = [];
        angular.forEach(['phonology', 'stress', 'syllabification', 'vowelisation'], function (type) {
            var rules = alphabet[type + 'Rules'], count = 0;
            angular.forEach(rules, function (rule) {
                // $log.debug(rule);
                angular.forEach(rule.sequences, function (seq) {
                    var funcId = rule.type + '_' + rule.ruleId + '_' + seq.sequenceId,
                        pattern, regex, validator;
                    count++;
                    if (type === 'phonology' || type === 'vowelisation') {
                        pattern = prepareSequencePattern(seq.incorrect);
                        regex = new RegExp(pattern);
                        seq.regex = regex;
                        validator = function (s) {
                            var matchObject = s.match(regex), rv = null;
                            if (matchObject) {
                                rv = {
                                    match: matchObject,
                                    replacement: s.replace(regex, seq.correct)
                                };
                            }
                            return rv;
                        };
                    } else {
                        pattern = prepareSequencePattern(seq.correct);
                        regex = new RegExp(pattern);
                        seq.regex = regex;
                        validator = function (s) {
                            var matchObject = s.match(regex), rv = null;
                            if (matchObject) {
                                rv = {
                                    match: matchObject
                                };
                            }
                            return rv;
                        }
                    }
                    validatorById[funcId] = validator;
                    alphabet.validators.push(validator);
                });
            });
            $log.debug('found', rules.length, type, 'rules,', count, 'sequences');
        });
    }

    function saveCurrentThenGoTo(item) {
        var currentItem = $scope.currentItem,
            formInput = $scope.formInput,
            nextItem, variant;
        // $log.debug('save current edited item, spellingCorrection, sampa, tag, etc.');
        $q.resolve(true).then(function () {
            if (currentItem) {
                // $log.debug('save formInput', formInput, 'into current item', currentItem);
                currentItem.spellingCorrection = formInput.spellingCorrection;
                currentItem.variants.length = 0;
                angular.forEach(formInput.variants, function (v) {
                    if (v.sampa.search(/\S/) >= 0) {
                        variant = angular.extend({}, v);
                        currentItem.variants.push(variant);
                    }
                });
                // $log.debug('after saving', currentItem);
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
        if (angular.isNumber(alphabetId)) {
            $log.debug('chosen alphabet', alphabetId);
            if (angular.isDefined(fullAlphabets[alphabetId])) {
                validators = fullAlphabets[alphabetId].validators;
            } else {
                Lex.getAlphabet(alphabetId).then(function (response) {
                    var alphabet = response.data.alphabet;
                    parseAlphabet(alphabet);
                    validators = alphabet.validators;
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
    $scope.checkSampa = function (index) {
        var formInput = $scope.formInput,
            sampa = formInput.variants[index].sampa,
            alphabet = fullAlphabets[$scope.alphabetId];
        $log.debug('checking sampa', index, formInput.variants[index], sampa);
        $log.debug('current alphabet', alphabet);
        if (alphabet) {
            angular.forEach(alphabet.phonologyRules, function (rule) {
                angular.forEach(rule.sequences, function (seq) {
                    var matchObject = sampa.match(seq.regex);
                    if (matchObject) {
                        var correction = sampa.replace(seq.regex, seq.correct);
                        $log.debug(rule, seq, seq.regex, matchObject, correction);
                    }
                });
            })
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
