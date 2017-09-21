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
        getSymbols: function () {
            return $http.get(api('/symbols/'));
        },
        getTasks: function () {
            return $http.get(api('/tasks/'));
        },
        getTask: function (taskId) {
            return $http.get(api('/tasks/' + taskId));
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
