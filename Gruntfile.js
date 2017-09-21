module.exports = function (grunt) {

    var gruntConfig = {
            watch: {
                components: {
                    files: ['components', '!components/index.js'],
                    tasks: ['prepareNewComponent']
                },
                dialog: {
                    files: ['dialogs', '!dialogs/index.js'],
                    tasks: ['prepareNewDialog']
                },
                view: {
                    files: ['views', '!views/index.js'],
                    tasks: ['prepareNewView']
                },
                options: {
                    cwd: './src',
                    spawn: false
                }
            }
        },
        chalk = require('chalk');

    grunt.initConfig(gruntConfig);

    grunt.registerTask('updateIndexPage', 'Update index page in build/dev with css/js file links', function () {
        grunt.file.copy('src/index.html', 'build/dev/index.html', {
            process: function insertDependencies(fileContent, srcPath) {
                var data = fileContent,
                    cssList = [],
                    jsList = [],
                    patternCss = '<!-- >>> application css -->[\\s\\S]*<!-- <<< application css -->',
                    patternJs = '<!-- >>> application js -->[\\s\\S]*<!-- <<< application js -->',
                    regexCss = new RegExp(patternCss, 'm'),
                    regexJs = new RegExp(patternJs, 'm');


                grunt.file.expand({cwd: 'build/dev/static/js'}, '**/*.js').forEach(function (relpath) {
                    // grunt.log.writeln(relpath);
                    jsList.push('<script src="/static/js/' + relpath + '"></script>');
                });
                grunt.file.expand({cwd: 'build/dev/static/css'}, '**/*.css').forEach(function (relpath) {
                    // grunt.log.writeln(relpath);
                    cssList.push('<link rel="stylesheet" href="/static/css/' + relpath + '">');
                });

                data = data.replace(regexCss, cssList.join('\n'));
                data = data.replace(regexJs, jsList.join('\n'));
                return data;
            }
        });
    });

    grunt.registerTask('default', ['updateIndexPage']);
};
