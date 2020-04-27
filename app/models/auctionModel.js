//var mysql = require('mysql');
var async = require('async');
var Helper = require('../../helper');
var constants = require("../../constants");
var Pet = require("./petModel");
var User = require("./userModel");

function Auction() {
    this.id = null;
    this.amount = new Pet();
    this.pet = new Pet();
    this.bidder = new User();
}

// create new auction
Auction.prototype.addAuction = function (gConnection, auction, finalCallback) {
    var self = this;
    async.waterfall([

        function (callback) {
            var preparedSqlQuery = "INSERT INTO auction (amount,bidder_id,pet_id) VALUES (?,?,?)";
            var values = [auction.amount, auction.bidder.id, auction.pet.id];
            gConnection.query(preparedSqlQuery, values, function (err, results, fields) {

                if (!err && results) {
                    self.id = results.insertId;
                    self.amount = auction.amount;
                    callback(null);
                }
                else {
                    callback(err);
                }
            });
        }
    ],
        function (err) {
            finalCallback(err, self);
        });
};

//get auction by id
Auction.prototype.getAuctionByID = function (gConnection, auctionID, finalCallback) {
    var self = this;
    async.waterfall([

        function (callback) {
            var preparedSqlQuery = `select * from auction where id = ${auctionID}`;
            gConnection.query(preparedSqlQuery, function (err, results, fields) {

                if (!err && results) {
                    if (results.length > 0) {
                        self.id = element.id;
                        self.amount = element.amount;
                        callback(null);
                    } else {
                        let ERR = new Error();
                        ERR.message = "Invalid auction ID!!!";
                        callback(ERR);
                    }
                }
                else {
                    callback(err);
                }
            });
        }
    ],
        function (err) {
            finalCallback(err, self);
        });
};

//get auction by id
Auction.prototype.listBidsOfOwner = function (gConnection, owner, finalCallback) {
    let listBidsOfOwner = [];
    async.waterfall([
        function (callback) {
            var preparedSqlQuery = `select auction.id as id, user.id as bidderID , user.name as bidderName , 
            pet.id as petID ,pet.type as petType ,pet.name as petName , pet.owner_id as petOwnerID,amount as bidAmount
            from auction 
            inner join pet on auction.pet_id = pet.id
            inner join user on auction.bidder_id = user.id
            where pet.owner_id = ${owner.id}`;
            gConnection.query(preparedSqlQuery, function (err, results, fields) {
                if (!err && results) {
                    if (results.length > 0) {
                        for (let index = 0; index < results.length; index++) {
                            const element = results[index];
                            var self = new Auction();
                            self.id = element.id;
                            self.bidder.id = element.bidderID;
                            self.bidder.name = element.bidderName;
                            self.pet.id = element.petID;
                            self.pet.name = element.petName;
                            self.pet.type = element.petType;
                            self.pet.owner = owner;
                            self.amount = element.bidAmount;
                            listBidsOfOwner.push(self);
                        }
                        callback(null);
                    } else {
                        callback(null);
                    }
                }
                else {
                    callback(err);
                }
            });
        }
    ],
        function (err) {
            finalCallback(err, listBidsOfOwner);
        });
};

//calculate bid amount using GSP auction
Auction.prototype.calculateBidAmountUsingGSP = function (gConnection, pet, finalCallback) {
    let listOfBids = [];
    async.waterfall([
        function (callback) {
            var preparedSqlQuery = `select user.id as bidderID , user.name as bidderName , amount 
            from auction 
            inner join user on auction.bidder_id = user.id 
            where pet_id = ${pet.id} 
            order by amount desc , name`;
            gConnection.query(preparedSqlQuery, function (err, results, fields) {
                if (!err && results) {
                    if (results.length > 1) {
                        for (let index = 0; index < results.length; index++) {
                            const currentElement = results[index];
                            var bidElement = {
                                "bidder": {
                                    "id": currentElement.bidderID,
                                    "name": currentElement.bidderName
                                },
                                "amount": null
                            };
                            if (index == results.length - 1) {
                                bidElement.amount = "LOST";
                            } else {
                                const nextElement = results[index + 1];
                                bidElement.amount = nextElement.amount;
                            }
                            listOfBids.push(bidElement);
                        }
                        callback(null);
                    }
                    else if (results.length == 1) {
                        let ERR = new Error();
                        ERR.message = "Just one bid!!!,with name: " + results[0].bidderName + " and amount: " + results[0].amount;
                        callback(ERR);
                    }
                    else {
                        let ERR = new Error();
                        ERR.message = "No Winners!!!";
                        callback(ERR);
                    }
                }
                else {
                    callback(err);
                }
            });
        }
    ],
        function (err) {
            finalCallback(err, listOfBids);
        });
};

module.exports = Auction;
