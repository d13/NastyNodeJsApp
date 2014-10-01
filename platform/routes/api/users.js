var _ = require('lodash-node');

var userList = [
    {
        'first-name': 'Joe',
        'last-name': 'One',
        'token': 0
    },
    {
        'first-name': 'Joe',
        'last-name': 'Two',
        'token': 1
    },
    {
        'first-name': 'Joe',
        'last-name': 'Three',
        'token': 2
    },
    {
        'first-name': 'Joe',
        'last-name': 'Four',
        'token': 3
    },
    {
        'first-name': 'Joe',
        'last-name': 'Five',
        'token': 4
    },
    {
        'first-name': 'Joe',
        'last-name': 'Six',
        'token': 5
    }
];
var addUser = function(data) {
    var obj = _.extend({ token: userList.length }, data);
    userList.push(obj);
    return { success: true, user: obj };
};
var deleteUser = function(id) {
    var result = false;
    if (userList[id]) {
        delete userList.splice(id, 1);
        result = true;
    }
    return { success: result };
};
var getUser = function(id) {
    var user = userList[id];
    if (user) {
        return { success: true, user: user };
    }
    return { success: false };
};
module.exports = function(router) {
    router.route('/users')
        .all(function(req, res, next) {
            // if I need to do something generic
            next();
        })
        .get(function(req, res, next){
            res.json({ success: true, users: userList });
        })
        .post(function(req, res, next){
            //res.json(addUser(req.user));
            addUser(req.body);
            res.json({ success: true, users: userList });
        });

    router.param('user', function (req, res, next, id) {
        req.user = id;
        next();
    });
    router.route('/users/:user')
        .all(function(req, res, next) {
            // if I need to do something generic
            next();
        })
        .get(function(req, res, next){
            res.json(getUser(req.user));
        })
        .delete(function(req, res, next){
            res.json(deleteUser(req.user));
        });
};