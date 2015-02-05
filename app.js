/**
 * dependencies
 */
var express = require('express');

//var favicon = require('serve-favicon');
var logger = require('morgan');

// data-processing
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash        = require('connect-flash');

// compilers
var swig           = require('swig');
var lessMiddleware = require('less-middleware');

// local modules
var operations = require('./platform/operations');
var routes     = require('./platform/routes');

// platform config / context
var platformContext = require('./platformContext');


/**
 * express app
 */
var app = express();

if (platformContext.env.isDev) {
    app.enable('trust proxy');
}


/**
 * view engine setup
 */
app.engine('html', swig.renderFile);
app.set('views', platformContext.paths.views);
app.set('view engine', 'html');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', platformContext.caching);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: platformContext.caching });


/**
 * base middleware
 */
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(lessMiddleware(platformContext.paths.public, platformContext.lessOptions));
app.use(express.static(platformContext.paths.public));



/**
 * swig base variables
 */
swig.setDefaults(platformContext.swigOptions);


/**
 * operations
 */
operations();

/**
 * routes
 */
routes(app);

/**
 * error logging
 * - catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

/**
 * error handling
 * development mode will print stacktrace
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: platformContext.env.isDev ? err : {}
    });
});


module.exports = app;
