var conn = require('../../database');
var async = require('async');
var AuctionRepo = require('../repositories/auctionRepository')

function controllerSteps(req, res, next, AuctionAction) {
    let aConnection = null;

    async.waterfall([
        function (callback) {
            conn.connectionWithTransaction(function (err, connection) {
                aConnection = connection;
                callback(err);
            });
        }, function (callback) {
            AuctionAction(aConnection, function (err, returnedObject) {
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

module.exports.controllerAddAuction = function (req, res, next) {
    controllerSteps(req, res, next, function (connection, callback) {
        var auction = req.body.auction;
        AuctionRepo.addAuctionRepo(connection, auction, function (err, returnedObject) {
            callback(err, returnedObject);
        });
    });
};

module.exports.controllerListBids = function (req, res, next) {
    controllerSteps(req, res, next, function (connection, callback) {
        var ownerID = req.params.ownerID;
        AuctionRepo.listBidsOfOwnerRepo(connection, ownerID, function (err, returnedObject) {
            callback(err, returnedObject);
        });
    });
};

module.exports.calculateBidAmountUsingGSP = function (req, res, next) {
    controllerSteps(req, res, next, function (connection, callback) {
        var petID = req.params.petID;
        AuctionRepo.calculateBidAmountUsingGSP(connection, petID, function (err, returnedObject) {
            callback(err, returnedObject);
        });
    });
};