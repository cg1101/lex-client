var mod = angular.module('at.components.at-lex-data-input', []);

mod.controller('LexDataInputCtrl', function ($scope) {
});

mod.directive('atLexDataInput', function ($log, $timeout) {
    return {
        restrict: 'EA',
        scope: {
            whenDataLoaded: '&'
        },
        templateUrl: '/static/html/components/at-lex-data-input/at-lex-data-input.html',
        link: function (scope, iElement, iAttrs, ctrls) {
            var element = iElement[0],
                acceptableDataTypes = ['Files', 'text/plain'],
                inputBuffer = scope.inputBuffer = [];

            function dragEnter(event) {
                var dt = event.originalEvent.dataTransfer,
                    isAcceptable = false;

                event.preventDefault();
                for (var i = 0; i < dt.types.length; i++) {
                    if (acceptableDataTypes.indexOf(dt.types[i]) >= 0) {
                        isAcceptable = true;
                        break;
                    }
                }
                element.classList.add(isAcceptable ? 'drop-okay' : 'drop-not-okay');
            }

            function dragOver(event) {
                event.preventDefault();
            }

            function dragLeave(event) {
                element.classList.remove('drop-okay');
                element.classList.remove('drop-not-okay');
            }

            function drop(event) {
                var dt = event.originalEvent.dataTransfer;

                event.preventDefault();
                event.stopPropagation();
                element.classList.remove('drop-okay');
                element.classList.remove('drop-not-okay');

                if (dt.files.length) {
                    angular.forEach(dt.files, loadFile);
                } else {
                    var data = dt.getData('text/plain');
                    dataLoaded(null, 'text/plain', data);
                }
            }

            function loadFile(file) {
                var reader = new FileReader(file);
                reader.onload = function (ev) {
                    var data = ev.target.result;
                    dataLoaded(file.name, file.type || 'text/plain', data);
                };
                reader.readAsText(file);
            }

            function dataLoaded(filename, type, data) {
                $timeout(function () {
                    inputBuffer.push({
                        filename: filename,
                        type: type,
                        data: data
                    });
                    scope.whenDataLoaded({filename: filename, type: type, data: data});
                }, 0);
            }

            iElement.on('dragenter', dragEnter);
            iElement.on('dragover', dragOver);
            iElement.on('dragleave', dragLeave);
            iElement.on('drop', drop);
        },
        controller: 'LexDataInputCtrl as ctrl'
    };
});
