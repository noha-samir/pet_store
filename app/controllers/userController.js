var conn = require('../../database');
var async = require('async');
var UserRepo = require('../repositories/userRepository')

function controllerSteps(req, res, next, UserAction) {
    let aConnection = null;

    async.waterfall([
        function (callback) {
            conn.connectionWithTransaction(function (err, connection) {
                aConnection = connection;
                callback(err);
            });
        }, function (callback) {
            UserAction(aConnection, function (err, returnedObject) {
                callback(err, returnedObject);
            });
        }
    ],
        function (err, output) {
            conn.releaseConnectionWithTransaction(err, aConnection, function (err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).json(output);
                }
            })
        });
};

//add new user
module.exports.controllerAddUser = function (req, res, next) {
    controllerSteps(req, res, next, function (connection, callback) {
        var user = req.body.user;
        UserRepo.addUserRepo(connection, user, function (err, returnedObject) {
            callback(err, returnedObject);
        });
    });
};