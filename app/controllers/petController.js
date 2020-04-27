var conn = require('../../database');
var async = require('async');
var petRepo = require('../repositories/petRepository')

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

module.exports.controllerAddPet = function (req, res, next) {
    controllerSteps(req, res, next, function (connection, callback) {
        var pet = req.body.pet;
        petRepo.addPetRepo(connection, pet, function (err, returnedObject) {
            callback(err, returnedObject);
        });
    });
};