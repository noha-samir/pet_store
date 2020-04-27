var async = require('async');
var Helper = require('../../helper');
var constants = require("../../constants");
var userModel = require('../models/userModel'); //for DB connections 

module.exports.addUserRepo = function (connection, user, finalCallback) {
    let aUserModel = new userModel();
    aUserModel.addUser(connection, user, function (err, returnedUser) {
        finalCallback(err, returnedUser);
    });
}