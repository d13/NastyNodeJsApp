var _ = require('lodash-node');

// paths
var path = require('path');
var basePath = path.join(__dirname);


// environment data
var envMode = process.env.NODE_ENV || 'development';
var isDev = envMode === 'development';

module.exports = {
    env: {
        mode: envMode,
        isDev: isDev
    },
    paths: {
        base: basePath,
        public: path.join(basePath, '/public'),
        views: path.join(basePath, '/platform/views'),
        scripts: {
            input: path.join(basePath, '/public/scripts/workbench'),
            output: path.join(basePath, '/public/scripts/workbench-built')
        }
    },
    caching: !isDev,
    lessOptions: {
        compiler: {
            sourceMap: true
        }
    },
    swigOptions: {
        locals: {
            now: function () {
                return new Date();
            },
            devMode: isDev
        }
    }
};