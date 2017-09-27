var mod = angular.module('at.views.task', []);

mod.controller('TaskCtrl', function ($scope, Lex, $q, taskId, $log, $timeout, $filter) {

    (function init(delay) {
        $scope.context = {isLoading: true};
        $scope.dataBuffer = [];
        $scope.dataPack;

        $q.all({
            task: Lex.getTask(taskId)
        }).then(function (result) {
            $scope.task = result.task.data.task;
        }).finally(function () {
            delete $scope.context.isLoading;
        });

        Lex.getTaskSubTasks(taskId).then(function (response) {
            $scope.subTasks = response.data.subTasks;
        })
    })(0);

    this.dataLoaded = function (filename, type, size, data) {
        var parsedData = [],
            maxColumn = 1, cols;
        if (filename === null && type === 'text/plain') {
            var wordList = {};
            angular.forEach(data.split(/\s+/), function (word) {
                if (!angular.isDefined(wordList[word])) {
                    wordList[word] = 0;
                }
                wordList[word]++;
            });
            maxColumn = 3;
            angular.forEach(wordList, function (freq, word) {
                parsedData.push([word, word, freq]);
            });
            parsedData = $filter('orderBy')(parsedData);
        } else {
            angular.forEach(data.split(/\n/), function (line) {
                line = line.replace(/\r$/, '');
                if (line.search(/\S+/) >= 0) {
                    var cols = line.split(/\t/);
                    maxColumn = cols.length > maxColumn ? cols.length : maxColumn;
                    parsedData.push(cols);
                }
            });
        }
        cols = [];
        var base = 'A'.charCodeAt(0);
        for (var i = 0; i < maxColumn; i++) {
            var ch = String.fromCharCode(base + i);
            cols.push(ch);
        }
        $timeout(function () {
            $scope.dataBuffer.push({
                filename: filename,
                type: type,
                size: size,
                data: data,
                cols: cols,
                parsedData: parsedData
            });
            $log.debug('parsedData', parsedData);
        }, 0);
    };
    this.saveData = function () {
        var dataPack = $scope.dataPack;
        if (dataPack) {
            alert('data saved!');
        }
    };

    $scope.getDataTabTitle = function (i) {
        return 'filename: ' + (i.filename || 'n/a') + '\n' +
            'type: ' + (i.type || 'n/a') + '\n' +
            'size: ' + i.size;
    };
    $scope.closeDataTab = function (index) {
        $log.debug('trying to delete tab #' + index);
        $timeout(function () {
            if (confirm('Do you want to close this tab?')) {
                $scope.dataBuffer.splice(index, 1);
            }
        });
    };
    $scope.setDataPack = function (dataPack) {
        $scope.dataPack = dataPack;
    };
});

mod.config(function ($stateProvider) {
    $stateProvider.state('task', {
        url: '/tasks/{taskId:[0-9]+}',
        templateUrl: '/static/html/views/task/task.html',
        resolve: {
            taskId: function ($stateParams) {
                return $stateParams.taskId;
            }
        },
        controller: 'TaskCtrl as ctrl'
    });
});
