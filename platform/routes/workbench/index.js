var express = require('express');
module.exports = function(app){
    var router = express.Router();
    require('./landing')(router);
    app.use(router);
};