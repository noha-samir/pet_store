const Joi = require('joi');
var async = require('async');

//JOI validation insert User Schema
const insertUserSchema = Joi.object().keys({
    user: Joi.object().keys({
        name: Joi.string().error(new Error("User name must be string!!!")),
    })
});

module.exports.insertUserValidation = function (req, res, next) {
    async.waterfall([
        function (callback) {
            Joi.validate(req.body, insertUserSchema, { stripUnknown: false }, { abortEarly: true }, function (err) {
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