const Joi = require('joi');
var async = require('async');

//JOI validation insert Auction Schema
const insertAuctionSchema = Joi.object().keys({
    auction: Joi.object().keys({
        bidder: Joi.object().keys({
            id: Joi.number().positive().error(new Error("Bidder ID must be a positive number!!!"))
        }),
        pet: Joi.object().keys({
            id: Joi.number().positive().error(new Error("Pet ID must be a positive number!!!"))
        }),
        amount: Joi.number().positive().error(new Error("Amount must be a positive number!!!"))
    })
});

module.exports.insertAuctionValidation = function (req, res, next) {
    async.waterfall([
        function (callback) {
            Joi.validate(req.body, insertAuctionSchema, { stripUnknown: false }, { abortEarly: true }, function (err) {
                if (!err) {
                    callback(null);
                }
                else {
                    callback(err);
                }
            });
        }
    ], function (err) {
        if (!err) {
            next();
        }
        else {
            next(err);
        }
    });

}

//*******************************************************************//


//JOI validation list Bids Schema
const listBidsSchema = Joi.object().keys({
    ownerID: Joi.number().positive().error(new Error("ownerID must be a positive number!!!"))
});

module.exports.listBidsValidation = function (req, res, next) {
    async.waterfall([
        function (callback) {
            Joi.validate(req.params, listBidsSchema, { stripUnknown: false }, { abortEarly: true }, function (err) {
                if (!err) {
                    callback(null);
                }
                else {
                    callback(err);
                }
            });
        }
    ], function (err) {
        if (!err) {
            next();
        }
        else {
            next(err);
        }
    });
}

//*******************************************************************//


//JOI validation calculate Bid Amount Using GSP Schema
const calculateBidAmountUsingGSPSchema = Joi.object().keys({
    petID: Joi.number().positive().error(new Error("pet ID must be a positive number!!!"))
});

module.exports.calculateBidAmountUsingGSPValidation = function (req, res, next) {
    async.waterfall([
        function (callback) {
            Joi.validate(req.params, calculateBidAmountUsingGSPSchema, { stripUnknown: false }, { abortEarly: true }, function (err) {
                if (!err) {
                    callback(null);
                }
                else {
                    callback(err);
                }
            });
        }
    ], function (err) {
        if (!err) {
            next();
        }
        else {
            next(err);
        }
    });
}
