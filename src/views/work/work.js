var mod = angular.module('at.views.work', []);

mod.controller('WorkCtrl', function ($scope, batchId, $q, Lex, $filter, $log, Linguist, $timeout) {

    var validators = [],
        validatorById = {},
        fullAlphabets = {};

    (function init(delay) {
        var t0 = new Date();

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

            $log.debug('page loading time', (new Date() - t0) / 1000);
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    function loadRawItems(rawItems) {
        var itemByHeadword = {}, items = [];
        angular.forEach(rawItems, function (rawItem) {
            var hw = rawItem.headword, newItem, tags = [];
            angular.forEach((rawItems.tag || '').split(/\t/), function (t) {
                if (/\S/.test(t)) {
                    tags.push(t);
                }
            });
            if (!angular.isDefined(itemByHeadword[hw])) {
                newItem = {
                    index: items.length,
                    headword: hw,
                    spellingCorrection: hw,
                    variants: [{sampa: rawItem.sampa, tags: tags, comment: null}]
                };
                itemByHeadword[hw] = newItem;
                items.push(newItem);
            } else {
                itemByHeadword[hw].variants.push({
                    sampa: rawItem.sampa,
                    tags: tags,
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
        $log.debug('save current edited item, spellingCorrection, sampa, tags, etc.');
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
                // $log.debug('after saving', currentItem);
                if (currentItem != item) {
                    $scope.currentItem = item;
                }
            }
        });
    }

    this.columnRemoved = function ($item, $model) {
        //$log.debug('data column was removed', $item, $model);
    };

    this.onKeyPress = function ($event, key) {
        var code = $event.keyCode;
        var currentItem = $scope.currentItem, item;
        if (currentItem) {
            item = $scope.items[currentItem.index + 1];
            if (!item) {
                item = currentItem;
            }
        }

        $log.debug('keypress event', $event, code);
        if (key === 'spellingCorrection' && code === 13) {
            $log.debug('save current and jump to next row');
            saveCurrentThenGoTo(item);
        }
    };

    $scope.$watch('currentItem', function (item) {
        var formInput = $scope.formInput = {};
        if (item) {
            formInput.headword = item.headword;
            formInput.spellingCorrection = item.spellingCorrection;
            formInput.variants = item.variants.slice();
            // $log.debug('set focus to spellingCorrection');
            $timeout(function () {
                $('#spellingCorrection').focus();
            }, 200);
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
