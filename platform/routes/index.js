
module.exports = function(app){
    require('./api/index')(app);
    require('./workbench/index')(app);
};