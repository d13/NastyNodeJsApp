define(
    [
        'jquery', 'underscore', 'backbone',
        'constants',
        'modules/analyticsManager', 'modules/templateManager', 'modules/featureManager',
        'models/user'
    ],
    function($, _, Backbone, BaseConstants, AnalyticsManager, TemplateManager, FeatureManager, User) {

        var constants = {

        };
        constants = _.defaults(constants, BaseConstants);

        var getWorkbenchData = function() {
            var data = _.clone(window.workbenchData, true) || {};

            delete window.workbenchData;

            return data;
        };

        var App = {
            initialize: function() {
                if (this.isInit) {
                    console.log('App -> initialized');
                    return;
                }
                console.log('App -> initializing');

                // similar to node.js EventEmitter methods
                this.eventEmitter = _.clone(Backbone.Events);
                this.eventEmitter.addListener =    this.eventEmitter.on;
                this.eventEmitter.removeListener = this.eventEmitter.off;
                this.eventEmitter.emit =           this.eventEmitter.trigger;

                this.featureManager = new FeatureManager();

                // get prefetched data
                this.prefetchData = getWorkbenchData();

                // TODO: build out collections from prefetch data

                // TODO: build a user profile if needed
                this.userModel = new User({ brand: 'ABC Brand' });

                this.analyticsManager = new AnalyticsManager(this.userModel);

                this.$workbenchEl = $('.workbench-root');
                this.templateManager = new TemplateManager(this.$workbenchEl);

                this.state = new Backbone.Model();

                this.isInit = true;
            }
        };
        App.initialize();

        return App;
    }
);