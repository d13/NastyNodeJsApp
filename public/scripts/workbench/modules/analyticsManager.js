define(['jquery', 'underscore'], function($, _) {
    var AnalyticsManager = function(options) {
        // put mixpanel, GA, etc...
    };
    AnalyticsManager.prototype = {
        track: function(event_name, properties) {
            var deferred = $.Deferred();

            console.log('Tracking: ', event_name);
            // make tracking api call, then resolve with response
            deferred.resolve({ });

            return deferred.promise();
        }
    };
    return AnalyticsManager;
});