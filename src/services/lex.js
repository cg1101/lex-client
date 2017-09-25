var mod = angular.module('lex.services.lex', []);

mod.factory('api', function () {
    const root = '/api/1.0';
    return function (serverPath) {
        return root + serverPath;
    };
});

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
        getBatch: function (batchId) {
            return {
                data: {
                    batch: {
                        batchId: batchId,
                        name: 'batch #' + batchId,
                        type: 'spelling',
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
                    }
                }
            };
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
