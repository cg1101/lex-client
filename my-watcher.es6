#!/usr/bin/node

var fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    glob = require('glob'),
    _ = require('lodash');

var templates = {
    components: {
        js: _.template(`var mod = angular.module('<%= moduleName %>', []);

mod.controller('<%= controllerName %>', function ($scope) {
});

mod.directive('<%= directiveName %>', function () {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: '<%= templateUrl %>',
        controller: '<%= controllerName %> as ctrl'
    };
});
`),
        html: _.template(`<!-- content of <%= directiveName %> -->`)
    },
    dialogs: {
        js: _.template(`var mod = angular.module('<%= moduleName %>', []);

mod.controller('<%= controllerName %>', function ($scope) {
    
    $scope.formInput = {};

    $scope.$watch('form', function (form) {
        if (form) {
            // TODO: install conditional validators
        }
    });

    this.okay = function () {
        if ($scope.form && $scope.form.$valid) {
            $scope.$close(true);
        }
    };
});
`),
        html: _.template(`<div class="modal-header">
    <a class="my-modal-close" ng-click="$dismiss()"></a>

    <h3 class="modal-title">{{title}}</h3>
</div>
<div class="modal-body">
    <div class="my-modal-form-wrapper">
        <div class="row form-wrapper" ng-form="form">

        </div>
    </div>
</div>
<div class="modal-footer">
    <div class="btn-toolbar pull-left">
        <button type="button"
                class="btn btn-flat btn-primary"
                ng-disabled="!form.$valid"
                ng-click="ctrl.okay()">OK
        </button>
        <span>OR</span>
        <a ng-click="$dismiss()">Cancel</a>
    </div>
</div>
`)
    },
    views: {
        js: _.template(`var mod = angular.module('<%= moduleName %>', []);

mod.controller('<%= controllerName %>', function ($scope) {
});

mod.config(function ($stateProvider) {
    $stateProvider.state('<%= viewName %>', {
        url: '<%= viewUrl %>',
        templateUrl: '<%= templateUrl %>',
        controller: '<%= controllerName %> as ctrl'
    });
});
`),
        html: _.template(`<!-- content of <%= viewName %> -->`)
    }
};

function updateDialogs(category, target) {
    var appPrefix = 'at',
        prefix = `at.${category}.`,
        modules = [],
        moduleList,
        htmlRoot = '/static/html',
        index = path.join(target, 'index.js'),
        indexContent,
        stat,
        folders = glob.sync(path.join(target, '*/'));

    if (folders.length === 0) {
        console.log(chalk.blue('no folders found'));
    } else {
        folders.forEach(function (folder) {

            var basename = path.basename(folder),
                t = basename.split(/[-_]/).map(s=> {        // ['at', 'tag', 'pane'], ['dlg', 'about'], ['projects']
                    return s.toLowerCase();
                }),
                subModuleName = t.join('-'),
                name = t.map(function (s, index) {
                    if (index > 0) {
                        return s = s.charAt(0).toUpperCase() + s.slice(1);
                    }
                    return s;
                }).join(''),
                moduleName = `${appPrefix}.${category}.${subModuleName}`,
                controllerName = t.slice(
                        (category === 'components' && t[0] === appPrefix) ?
                            1 : 0).map(function (s) {
                        return s = s.charAt(0).toUpperCase() + s.slice(1);
                    }).join('') + 'Ctrl',
                viewUrl = '/' + t.join(''),
                toAdd = {};

            modules.push(`'${moduleName}'`);

            ['js', 'html'].forEach(function (extension) {
                var filepath = path.join(folder, basename + '.' + extension);
                try {
                    stat = fs.statSync(filepath);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        toAdd[extension] = filepath;
                    }
                }
            });

            for (extension in toAdd) {
                var filepath = toAdd[extension],
                    content;
                content = templates[category][extension]({
                    moduleName: moduleName,
                    controllerName: controllerName,
                    templateUrl: `${htmlRoot}/${category}/${basename}/${basename}.html`,
                    directiveName: name,
                    viewName: subModuleName.replace('-', '_'),
                    viewUrl: viewUrl
                });
                console.log(chalk.green(`adding ${filepath} ...`));
                fs.writeFileSync(filepath, content);
            }

        });
    }

    moduleList = modules.length === 0 ? '' : ('\n\t' + modules.join(',\n\t') + '\n');
    indexContent = `var mod = angular.module('at.${category}', [${moduleList}]);`;

    try {
        stat = fs.statSync(index);
        if (stat.isDirectory()) {
            throw new Error('index.js is a directory');
        }
    } catch (e) {
        if (e.code === 'ENOENT') {
            // no problem, we will create it
            console.log(chalk.cyan('creating new index.js'));
        }
    }
    fs.writeFileSync(index, indexContent);
// console.log('index content:\n', indexContent);
}

for (let category in templates) {
    (function () {
        var target = path.resolve('src', category);
        console.log(chalk.blue('Start watching ') + chalk.magenta(category) +
            ' @ ' + chalk.red(target) + ` ...`);
        fs.watch(target, (eventType, filename) => {
            if (filename === 'index.js') {
                console.log(chalk.cyan(`Change of index.js @ ${target} detected, skipping...`));
            } else {
                updateDialogs(category, target);
            }
        });
    })();
}
