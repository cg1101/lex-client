var mod = angular.module('at.views.task', []);

mod.controller('TaskCtrl', function ($scope, Lex, $q, taskId, $log, $timeout, $filter) {

    (function init(delay) {
        $scope.context = {isLoading: true};
        $scope.task = null;
        $scope.project = null;
        $scope.alphabet = null;
        $scope.subTasks = [];
        $scope.dataBuffer = [];
        $scope.dataPack = null;

        $q.all({
            task: Lex.getTask(taskId),
            subTasks: Lex.getTaskSubTasks(taskId),
            loads: Lex.getTaskLoads(taskId)
        }).then(function (result) {
            var task = result.task.data.task,
                subTasks = result.subTasks.data.subTasks;
            $scope.task = task;
            $scope.subTasks = subTasks;
            $scope.loads = result.loads.data.loads;

            Lex.getProject(task.projectId).then(function (response) {
                $scope.project = response.data.project;
            });
            if (task.taskType !== 'Spelling') {
                Lex.getAlphabet(task.alphabetId).then(function (response) {
                    $scope.alphabet = response.data.alphabet;
                });
            }
        }).finally(function () {
            delete $scope.context.isLoading;
        });
    })(0);

    function loadWordListDataFile(filename, type, size, data) {
        $log.debug('loading data as wordlist');
        $log.debug('filename', filename, 'type', type, 'size', size, 'data', data);

        var rows = [],
            rowByHeadword = {},
            maxColumn = 1, cols;

        if (filename === null && type === 'text/plain') {
            // load from random text
            var wordList = {};
            angular.forEach(data.split(/\s+/), function (word) {
                if (!angular.isDefined(wordList[word])) {
                    wordList[word] = 0;
                }
                wordList[word]++;
            });
            cols = [
                {
                    index: 0,
                    label: 'headword'
                },
                {
                    index: 1,
                    label: 'spellingCorrection'
                },
                {
                    index: 2,
                    label: 'frequency'
                }
            ];
            angular.forEach(wordList, function (freq, word) {
                var row = [word, word, freq];
                rows.push(row);
                rowByHeadword[word] = row;
            });
            rows = $filter('orderBy')(rows);
        } else if (filename !== null) {
            // load as text file
            var badLines = [];
            angular.forEach(data.split(/\n/), function (line) {
                line = line.replace(/\r$/, '');
                if (line.search(/\S+/) >= 0) {
                    var buf = line.split(/\t/),
                        hw = buf[0];
                    if (buf.length < 2) {
                        $log.warn('invalid format detected', line);
                        badLines.push(line);
                    } else {
                        maxColumn = buf.length > maxColumn ? buf.length : maxColumn;
                        if (!angular.isDefined(rowByHeadword[hw])) {
                            rowByHeadword[hw] = buf;
                            rows.push(buf);
                        } else {
                            $log.warn('found duplicate headword', buf);
                        }
                    }
                }
            });
            cols = [
                {
                    index: 0,
                    label: 'headword'
                },
                {
                    index: 1,
                    label: 'spellingCorrection'
                }
            ];
            while (cols.length < maxColumn) {
                cols.push({
                    index: cols.length,
                    label: ''
                });
            }
        } else {
            $log.warn('unsupported file type');
            return;
        }
        $timeout(function () {
            $scope.dataBuffer.push({
                filename: filename,
                type: type,
                size: size,
                data: data,
                cols: cols,
                rows: rows,
                rowByHeadword: rowByHeadword
            });
            $log.debug('rows', rows);
        }, 0);

    }

    this.dataLoaded = function (filename, type, size, data) {
        switch ($scope.task.taskType) {
            case 'Lexicon':
                break;
            case 'Spelling':
                loadWordListDataFile(filename, type, size, data);
                break;
            case 'Markup':
                break;
        }
    };
    this.checkData = function () {
        var data = {
                taskId: taskId,
                headwords: []
            },
            dataPack = $scope.dataPack;
        angular.forEach(dataPack.rows, function (r) {
            var hw = r[0];
            data.headwords.push(hw);
        });
        Lex.checkHeadwords(data).then(function (response) {
            $log.debug('check headwords', response);
            var rs = response.data.headwords;
            dataPack.checked = true;
            angular.forEach(dataPack.rows, function (row) {
                var hw = row[0];
                row.checked = true;
                row.record = rs[hw];
            });
        });
    };

    this.saveData = function () {
        var dataPack = $scope.dataPack,
            data = {
                taskId: taskId,
                headwords: []
            };
        if (dataPack) {
            angular.forEach(dataPack.rows, function (row) {
                var rawPiece = {},
                    hw = row[0];
                rawPiece.rawText = hw;
                rawPiece.hypothesis = row[1];
                rawPiece.meta = {
                    other: row.slice(2)
                };
                data.headwords.push(rawPiece);
            });
            Lex.saveHeadwords(data).then(function (response) {
                alert('data saved!');
            });
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
