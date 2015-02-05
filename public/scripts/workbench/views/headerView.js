define(['jquery','underscore','backbone','constants', 'app'], function($, _, Backbone, BaseConstants, App) {

    var constants = {};
    constants = _.defaults(constants, BaseConstants);

    var HeaderView = Backbone.View.extend({
        el: App.$workbenchEl.find('[data-region="workbench-header"]'),
        template: App.templateManager.get('workbench-header'),

        events: {

        },

        initialize : function() {

            console.log('WorkbenchNavView -> init');
        },

        prepareData: function() {
            this.templateData = this.templateData || {};
            _.extend(this.templateData, {
                brand: App.userModel.get('brand')
            });
            return this.templateData;
        },

        render : function() {
            this.$el.html(this.template(this.prepareData()));
            this.isRendered = true;
            return this;
        }
    });

    return HeaderView;
});
