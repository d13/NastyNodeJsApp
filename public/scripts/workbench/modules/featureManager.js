define(['modernizr'], function(Modernizr) {
    var hasMediaQuery = Modernizr.mq('only all');
    var mediaQueryClass = 'mediaquery';

    var FeatureManager = function(options) {
        this.hasMediaQuery = hasMediaQuery;

        var glue = hasMediaQuery ? ' ' : ' no-';
        document.querySelector('html').className += glue + mediaQueryClass;
    };
    FeatureManager.prototype = {
        test: function(feature) {
            if (feature === 'mediaquery') {
                return this.hasMediaQuery;
            }
            return Modernizr[feature];
        }
    };
    return FeatureManager;
});