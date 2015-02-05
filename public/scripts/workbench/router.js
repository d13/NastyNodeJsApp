define(['underscore', 'backbone', 'app'], function (_, Backbone, App) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            ':screen(/:section)': 'generic'
        },

        home: function() {
            this.navigate('welcome', { trigger: true });
        },
        generic: function(screen, section) {

            var eventName = 'screen:change';
            var eventData = { screen: screen };
            var eventLog = 'screen:' + screen;
            if (section) {
                eventName += ' screen:' + screen + ':change';
                eventData.section = section;
                eventLog += ':' + section;
            }

            App.eventEmitter.emit(eventName, eventData);
        }
    });
    return AppRouter;
});