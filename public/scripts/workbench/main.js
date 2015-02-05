require.config({
    //baseUrl: '/scripts/workbench',
    paths: {
        'jquery':               ['//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min', '../libs/jQuery/jquery-1.11.1.min'],
        'underscore':           '../libs/lodash/2.4.1/lodash.underscore.min',
        'backbone':             '../libs/backbone/backbone-1.1.2.min',
        'modernizr':            '../libs/modernizr/modernizr-2.8.3.custom.min',
        'swig':                 '../libs/swig/swig.min'
    },
    shim: {
        'modernizr':            { exports: 'Modernizr' }
    }
});

require(['libs'], function () {
    require(['jquery', 'backbone', 'app', 'views/workbenchView'], function($, Backbone, App, WorkbenchView) {
        $(document).ready(function() {
            (new WorkbenchView()).render();

            Backbone.history.start();
        });
    });
});