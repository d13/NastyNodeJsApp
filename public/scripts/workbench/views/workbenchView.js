define(['jquery','underscore','backbone', 'constants', 'app', 'router', 'views/headerView'
], function(
        $, _, Backbone, BaseConstants, App, AppRouter, HeaderView
    ) {

    var constants = {};
    constants = _.defaults(constants, BaseConstants);

    var WorkbenchView = Backbone.View.extend({
        el: App.$workbenchEl,
        initialize : function() {

            // main screens
            this.workbenchNav = new HeaderView();

            App.router = new AppRouter();

            App.analyticsManager.track('Workbench Loaded');
        },

        render : function() {
            this.workbenchNav.render();

            this.isRendered = true;
            return this;
        }
    });

    return WorkbenchView;
});