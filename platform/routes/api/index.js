var express = require('express');
module.exports = function(app){
    var router = express.Router();
    router.route('/')
        .get(function(req, res, next){
            res.json({ message: 'Welcome to the Platform API' });
        });
    require('./users')(router);
    app.use('/api', router);
};