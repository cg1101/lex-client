var mod = angular.module('lex.services.lex', []);

mod.factory('api', function () {
    const root = '/api/1.0';
    return function (serverPath) {
        return root + serverPath;
    };
});

function returnFakeBatchContext(batchId) {
    var task, subTask, batch;
    switch (batchId) {
        case 12345:
            task = {
                taskId: 46641,
                name: 'Absinthe Bilingual Dictionaries - Test TL 2',
                projectId: 11907,
                taskTypeId: 2,
                taskType: 'Spelling',
                alphabetId: 45,
                url: null,
                conventionsUrl: null,
                hasSecondHeadword: true
            };
            subTask = {
                subTaskId: 2053001,
                taskId: 46641,
                name: 'Work',
                description: 'NDT terms for TL'
            };
            batch = {
                batchId: batchId,
                name: 'batch #' + batchId,
                type: 'Spelling',
                data: [
                    {headword: 'johnstone\'s'},
                    {headword: 'venus'},
                    {headword: 'midshires'},
                    {headword: 'hairport'},
                    {headword: 'natuzzi'},
                    {headword: 'masterfit'},
                    {headword: 'schuh'},
                    {headword: 'quotidien'},
                    {headword: 'autoparts'},
                    {headword: 'h&t'},
                    {headword: 'blacksmiths'},
                    {headword: 'dollond'},
                    {headword: 'alldays'},
                    {headword: 'eves'},
                    {headword: 'poundworld'},
                    {headword: 'norwest'},
                    {headword: 'barratt'},
                    {headword: 'beautique'},
                    {headword: 'dolcis'},
                    {headword: 'foodstores'},
                    {headword: 'chipsaway'},
                    {headword: 'handelsbanken'},
                    {headword: 'spielmann'},
                    {headword: 'livingwell'},
                    {headword: 'mk'},
                    {headword: 'precis'},
                    {headword: 'poundstretcher'},
                    {headword: 'denmans'},
                    {headword: 'mccoll\'s'},
                    {headword: 'btcv'},
                    {headword: 'imo'}
                ]
            };
            break;
        case 56789:
            task = {
                taskId: 6066,
                name: 'AppenLex testing',
                projectId: 10773,
                taskTypeId: 1,
                taskType: 'Lexicon',
                alphabetId: 2,
                url: null,
                conventionsUrl: null,
                hasSecondHeadword: false
            };
            subTask = {
                subTaskId: 63001,
                taskId: 6066,
                name: 'Work',
                description: 'Systems UAT for James'
            };
            batch = {
                batchId: batchId,
                name: 'batch #' + batchId,
                type: 'Lexicon',
                data: [
                    {
                        "ranking": 0,
                        "headword": "Band",
                        "sampa": "\" b_< A n d_<"
                    },
                    {
                        "ranking": 0,
                        "headword": "Cola",
                        "sampa": "\" k O . l A"
                    },
                    {
                        "ranking": 0,
                        "headword": "December",
                        "sampa": "d_< A . \" s E m . b_< A"
                    },
                    {
                        "ranking": 1,
                        "headword": "December",
                        "sampa": "d_< i . \" s E m . b_< A"
                    },
                    {
                        "ranking": 0,
                        "headword": "I",
                        "sampa": "\" A . i"
                    },
                    {
                        "ranking": 0,
                        "headword": "Sundays",
                        "sampa": "\" s A n . d_< E z"
                    },
                    {
                        "ranking": 0,
                        "headword": "academic",
                        "sampa": "A . k A . \" d_< E . m i k"
                    },
                    {
                        "ranking": 0,
                        "headword": "academy",
                        "sampa": "A . \" k A . d_< A . m i"
                    },
                    {
                        "ranking": 0,
                        "headword": "account",
                        "sampa": "A . \" k A . u n t"
                    },
                    {
                        "ranking": 0,
                        "headword": "action",
                        "sampa": "\" A k . S A n"
                    },
                    {
                        "ranking": 0,
                        "headword": "address",
                        "sampa": "A . \" d_< r E s"
                    },
                    {
                        "ranking": 1,
                        "headword": "address",
                        "sampa": "\" A . d_< r E s"
                    },
                    {
                        "ranking": 0,
                        "headword": "advance",
                        "sampa": "A d_< . \" v A n s"
                    },
                    {
                        "ranking": 0,
                        "headword": "advantage",
                        "sampa": "A d_< . \" v A n . t i J\\_<"
                    },
                    {
                        "ranking": 0,
                        "headword": "adventure",
                        "sampa": "A d_< . \" v E n . tS A"
                    },
                    {
                        "ranking": 0,
                        "headword": "affect",
                        "sampa": "A . \" f E k t"
                    },
                    {
                        "ranking": 1,
                        "headword": "affect",
                        "sampa": "\" A . f E k t"
                    },
                    {
                        "ranking": 0,
                        "headword": "afford",
                        "sampa": "A . \" f O d_<"
                    },
                    {
                        "ranking": 0,
                        "headword": "age",
                        "sampa": "\" E J\\_<"
                    },
                    {
                        "ranking": 0,
                        "headword": "agriculture",
                        "sampa": "\" A . g_< r A . k A l . tS A"
                    },
                    {
                        "ranking": 1,
                        "headword": "agriculture",
                        "sampa": "\" A . g_< r i . k A l . tS A"
                    },
                    {
                        "ranking": 0,
                        "headword": "all",
                        "sampa": "\" O l"
                    },
                    {
                        "ranking": 0,
                        "headword": "aloe",
                        "sampa": "\" A . l O"
                    },
                    {
                        "ranking": 0,
                        "headword": "apart",
                        "sampa": "A . \" p A t"
                    },
                    {
                        "ranking": 0,
                        "headword": "apply",
                        "sampa": "A . \" p l A . i"
                    },
                    {
                        "ranking": 0,
                        "headword": "aunt",
                        "sampa": "\" A n t"
                    },
                    {
                        "ranking": 0,
                        "headword": "available",
                        "sampa": "A . \" v E . l A . b_< A l"
                    },
                    {
                        "ranking": 0,
                        "headword": "balanced",
                        "sampa": "\" b_< A . l A n s t"
                    },
                    {
                        "ranking": 0,
                        "headword": "bales",
                        "sampa": "\" b_< E l z"
                    }
                ]
            };
            break;
        case 34567:
            task = {
                taskId: 4669,
                name: 'Absinthe Bilingual Dictionaries - MSA',
                projectId: 11907,
                taskTypeId: 3,
                taskType: 'Markup',
                alphabetId: 10,
                url: null,
                conventionsUrl: null,
                hasSecondHeadword: true
            };
            subTask = {
                subTaskId: 2058001,
                taskId: 4669,
                name: 'Work',
                description: 'Absinthe Bilingual Dictionaries - MSA'
            };
            batch = {
                batchId: batchId,
                name: 'batch #' + batchId,
                type: 'Markup',
                data: [
                    {
                        "ranking": 0,
                        "headword": "Band",
                        "sampa": "\" b_< A n d_<"
                    },
                    {
                        "ranking": 0,
                        "headword": "Cola",
                        "sampa": "\" k O . l A"
                    },
                    {
                        "ranking": 0,
                        "headword": "December",
                        "sampa": "d_< A . \" s E m . b_< A"
                    },
                    {
                        "ranking": 1,
                        "headword": "December",
                        "sampa": "d_< i . \" s E m . b_< A"
                    },
                    {
                        "ranking": 0,
                        "headword": "I",
                        "sampa": "\" A . i"
                    },
                    {
                        "ranking": 0,
                        "headword": "Sundays",
                        "sampa": "\" s A n . d_< E z"
                    },
                    {
                        "ranking": 0,
                        "headword": "academic",
                        "sampa": "A . k A . \" d_< E . m i k"
                    },
                    {
                        "ranking": 0,
                        "headword": "academy",
                        "sampa": "A . \" k A . d_< A . m i"
                    },
                    {
                        "ranking": 0,
                        "headword": "account",
                        "sampa": "A . \" k A . u n t"
                    },
                    {
                        "ranking": 0,
                        "headword": "action",
                        "sampa": "\" A k . S A n"
                    },
                    {
                        "ranking": 0,
                        "headword": "address",
                        "sampa": "A . \" d_< r E s"
                    },
                    {
                        "ranking": 1,
                        "headword": "address",
                        "sampa": "\" A . d_< r E s"
                    },
                    {
                        "ranking": 0,
                        "headword": "advance",
                        "sampa": "A d_< . \" v A n s"
                    },
                    {
                        "ranking": 0,
                        "headword": "advantage",
                        "sampa": "A d_< . \" v A n . t i J\\_<"
                    },
                    {
                        "ranking": 0,
                        "headword": "adventure",
                        "sampa": "A d_< . \" v E n . tS A"
                    },
                    {
                        "ranking": 0,
                        "headword": "affect",
                        "sampa": "A . \" f E k t"
                    },
                    {
                        "ranking": 1,
                        "headword": "affect",
                        "sampa": "\" A . f E k t"
                    },
                    {
                        "ranking": 0,
                        "headword": "afford",
                        "sampa": "A . \" f O d_<"
                    },
                    {
                        "ranking": 0,
                        "headword": "age",
                        "sampa": "\" E J\\_<"
                    },
                    {
                        "ranking": 0,
                        "headword": "agriculture",
                        "sampa": "\" A . g_< r A . k A l . tS A"
                    },
                    {
                        "ranking": 1,
                        "headword": "agriculture",
                        "sampa": "\" A . g_< r i . k A l . tS A"
                    },
                    {
                        "ranking": 0,
                        "headword": "all",
                        "sampa": "\" O l"
                    },
                    {
                        "ranking": 0,
                        "headword": "aloe",
                        "sampa": "\" A . l O"
                    },
                    {
                        "ranking": 0,
                        "headword": "apart",
                        "sampa": "A . \" p A t"
                    },
                    {
                        "ranking": 0,
                        "headword": "apply",
                        "sampa": "A . \" p l A . i"
                    },
                    {
                        "ranking": 0,
                        "headword": "aunt",
                        "sampa": "\" A n t"
                    },
                    {
                        "ranking": 0,
                        "headword": "available",
                        "sampa": "A . \" v E . l A . b_< A l"
                    },
                    {
                        "ranking": 0,
                        "headword": "balanced",
                        "sampa": "\" b_< A . l A n s t"
                    },
                    {
                        "ranking": 0,
                        "headword": "bales",
                        "sampa": "\" b_< E l z"
                    }
                ]
            };
    }
    console.log('task', task, 'subTask', subTask, 'batch', batch);
    return {
        task: task,
        subTask: subTask,
        batch: batch
    };
}

mod.factory('Lex', function ($http, $q, $filter, api, $timeout) {
    return {
        getAlphabets: function () {
            return $http.get(api('/alphabets/'));
        },
        getAlphabet: function (alphabetId) {
            return $http.get(api('/alphabets/' + alphabetId));
        },
        getDialects: function () {
            return $http.get(api('/dialects/'));
        },
        getProjects: function () {
            return $http.get(api('/projects/'));
        },
        getProject: function (projectId) {
            return $http.get(api('/projects/' + projectId));
        },
        getProjectTasks: function (projectId) {
            return $http.get(api('/projects/' + projectId + '/tasks/'))
        },
        getSymbols: function () {
            return $http.get(api('/symbols/'));
        },
        getTasks: function () {
            return $http.get(api('/tasks/'));
        },
        getTask: function (taskId) {
            return $http.get(api('/tasks/' + taskId));
        },
        getTaskSubTasks: function (taskId) {
            return $http.get(api('/tasks/' + taskId + '/subtasks/'));
        },
        getTaskTags: function (taskId) {
            return $http.get(api('/tasks/' + taskId + '/tags/'));
        },
        getTaskLoads: function (taskId) {
            return $http.get(api('/tasks/' + taskId + '/loads/'));
        },
        checkHeadwords: function (data) {
            var taskId = data.taskId;
            return $http.post(api('/tasks/' + taskId + '/check-headwords'), data);
        },
        saveHeadwords: function (data) {
            var taskId = data.taskId;
            return $http.post(api('/tasks/' + taskId + '/save-headwords'), data);
        },
        getBatchContext: function (batchId) {
            return $q.resolve({
                data: returnFakeBatchContext(parseInt(batchId))
            });
        },
        saveLexWork: function (data) {
            return $q.resolve({
                data: {
                    workEntry: {}
                }
            });
        },
        getFakeResponse: function (delay, data, config) {
            var _delay = delay || 0,
                _data = data || {_timer: _delay},
                _config = config || {};
            return $timeout(function () {
                return {
                    config: _config,
                    data: _data
                };
            }, _delay);
        }
    };
});
