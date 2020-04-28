var async = require('async');
var userModel = require('../models/userModel'); //for DB connections 
var petModel = require('../models/petModel'); //for DB connections 
var auctionModel = require('../models/auctionModel'); //for DB connections 

module.exports.addAuctionRepo = function (connection, auction, finalCallback) {
    async.waterfall([
        //validation on bidder
        function (callback) {
            let aUserModel = new userModel();
            aUserModel.getUserByID(connection, auction.bidder.id, function (err, aUser) {
                callback(err, aUser);
            });
        },
        //validation on pet
        function (aUser, callback) {
            let aPetModel = new petModel();
            aPetModel.getPetByID(connection, auction.pet.id, function (err, aPet) {
                callback(err, aUser, aPet);
            });
        },
        //add bid
        function (aUser, aPet, callback) {
            let aAuctionModel = new auctionModel();
            aAuctionModel.addAuction(connection, auction, function (err, returnedAuction) {
                returnedAuction.bidder = aUser;
                returnedAuction.pet = aPet;
                callback(err, returnedAuction);
            });
        }
    ], function (err, returnedAuction) {
        finalCallback(err, returnedAuction);
    });
}

module.exports.listBidsOfOwnerRepo = function (connection, ownerID, finalCallback) {
    async.waterfall([
        //validation on bidder
        function (callback) {
            let aUserModel = new userModel();
            aUserModel.getUserByID(connection, ownerID, function (err, aUser) {
                callback(err, aUser);
            });
        },
        //list on bidders
        function (owner, callback) {
            let aAuctionModel = new auctionModel();
            aAuctionModel.listBidsOfOwner(connection, owner, function (err, listOfBidders) {
                callback(err, listOfBidders);
            });
        }
    ], function (err, listOfBidders) {
        finalCallback(err, listOfBidders);
    });
}

module.exports.calculateBidAmountUsingGSP = function (connection, petID, finalCallback) {
    async.waterfall([
        function (callback) {
            let aPetModel = new petModel();
            aPetModel.getPetByID(connection, petID, function (err, returnedPet) {
                callback(err, returnedPet);
            });
        },
        function (returnedPet, callback) {
            let aAuctionModel = new auctionModel();
            aAuctionModel.calculateBidAmountUsingGSP(connection, returnedPet, function (err, bidAmounts) {
                callback(err, bidAmounts);
            });
        }
    ], function (err, bidAmounts) {
        finalCallback(err, bidAmounts);
    });
}