define(['jquery','underscore','swig'], function($, _, swig) {

    var TemplateManager = (function(rootEl) {
        this.setRoot(rootEl);
        // TODO: fetching should be lazy right?
        this.fetch();
    });
    TemplateManager.prototype = {
        setRoot: function(rootEl) {
            this.$el = $(rootEl);
        },
        fetch: function(callback) {
            if (this.templates) {
                delete this.templates;
            }
            var $sources = this.$el.find('[data-workbench-template]');
            var sourceList = [];
            if ($sources.length) {
                $sources.each(function() {
                    var $this = $(this);
                    sourceList.push({
                        name: $this.data('workbench-template'),
                        html: $this.html()
                    });
                });
            }
            this.sources = sourceList;
            this.isFetched = true;

            if (_.isFunction(callback)) {
                callback();
            }
            return this;
        },
        compile: function(name) {
            if (!this.isFetched) {
                this.fetch();
            }
            if (!this.templates) {
                this.templates = [];
            }
            var tmpl = { tmpl: null };
            var source = _.find(this.sources, function(src) {
                return src.name === name;
            });

            if (source) {
                tmpl = {
                    name: name,
                    tmpl: swig.compile(source.html)
                };
                this.templates.push(tmpl);
            }
            return tmpl.tmpl;
        },
        get: function(name, options) {
            options || (options = {});
            if (!this.isFetched) {
                this.fetch();
            }
            var tmpl = { tmpl: null };
            if (this.templates && this.templates.length) {
                tmpl = _.find(this.templates, function(tmpl) {
                    return tmpl.name === name;
                });
            }
            if (!tmpl.tmpl && !options.isRetry && this.sources && this.sources.length) {
                this.compile(name);
                return this.get(name, _.extend(options, {
                    isRetry: true
                }));
            }
            if (_.isFunction(options.callback)) {
                options.callback(tmpl.tmpl);
            }
            return tmpl.tmpl;
        }
    };


    return TemplateManager;
});