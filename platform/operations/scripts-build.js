var fs = require('fs');
var _  = require('lodash-node');
var platform = require('../../platformContext');

var removeFilesInDir = function(dirPath, includeDir) {
    includeDir || (includeDir = false);
    var files;
    try {
        files = fs.readdirSync(dirPath);
    } catch(e) {
        return;
    }
    if (files.length > 0) {
        if (includeDir === false) {
            files = _.reject(files, function(name) {
                return name === '.gitignore';
            });
        } else {
            console.log('\n');
            console.log('deleting directory: ', dirPath, '\n----------------');
        }

        if (files.length > 0) {
            if (includeDir === false) {
                console.log('\n');
                console.log('deleting files in: ', dirPath, '\n----------------');
            }
            for (var i = 0; i < files.length; i++) {
                var fileName = files[i];
                var filePath = dirPath + '/' + fileName;
                if (fs.statSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                    console.log('deleted: ', fileName);
                } else {
                    removeFilesInDir(filePath, true);
                }
            }
        }
    }
    if (includeDir === true) {
        fs.rmdirSync(dirPath);
    }
};
module.exports = function() {
    // TODO: does this need to be re-loaded everytime?
    var requirejs = require('requirejs');

    // for single only
    var builtPath = platform.paths.scripts.input + '/main-built.js';

    var config = {
        wrapShim: true,
        baseUrl: platform.paths.scripts.input,
        mainConfigFile: platform.paths.scripts.input + '/main.js',
        // name: 'main',
        // out: builtPath,
        dir: platform.paths.scripts.output,

        // Setting logLevel:
        // TRACE: 0,
        // INFO: 1,
        // WARN: 2,
        // ERROR: 3,
        // SILENT: 4
        logLevel: platform.isDev ? 0 : 3,

        keepBuildDir: true,
        removeCombined: true,
        findNestedDependencies: true,

        generateSourceMaps: true,
        skipDirOptimize: false,
        preserveLicenseComments: false,
        optimize: 'uglify2',

        modules: [
            {
                name: 'main',
                exclude: [
                    'libs'
                ]
            },
            {
                name: 'libs'
            }
        ],
        paths: {
            'jquery': 'empty:'
        }

    };
    try {
        removeFilesInDir(platform.paths.scripts.output);
    } catch (ex) {
        // just eat it
        console.log(ex);
    }
    requirejs.optimize(config, function (buildResponse) {
        //buildResponse is just a text output of the modules
        //included. Load the built file for the contents.
        //Use config.out to get the optimized file contents.
        //var contents = fs.readFileSync(config.out, 'utf8');
    }, function(err) {
        //optimization err callback
        console.log(err);
    });
};