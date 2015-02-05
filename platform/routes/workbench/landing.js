module.exports = function(router) {
    router.route('/')
        .all(function(req, res, next) {
            // if I need to do something generic
            next();
        })
        .get(function(req, res, next){
            res.render('workbench', {
                title: 'Workbench Login'
            });
        });
};