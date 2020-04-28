const Joi = require('joi');
var async = require('async');

//JOI validation insert Pet Schema
const insertPetSchema = Joi.object().keys({
    pet: Joi.object().keys({
        type: Joi.string().error(new Error("Pet type must be string!!!")),
        name: Joi.string().error(new Error("Pet name must be string!!!")),
        owner: Joi.object().keys({
            id: Joi.number().positive().error(new Error("Owner ID must be a number!!!")),
        })
    })
});

module.exports.inserPetValidation = function (req, res, next) {
    async.waterfall([
        function (callback) {
            Joi.validate(req.body, insertPetSchema, { stripUnknown: false }, { abortEarly: true }, function (err) {
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