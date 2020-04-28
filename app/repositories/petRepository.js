var async = require('async');
var petModel = require('../models/petModel'); //for DB connections 
var userModel = require('../models/userModel'); //for DB connections 

//add new pet
module.exports.addPetRepo = function (connection, pet, finalCallback) {
    async.waterfall([
        function (callback) {
            let aUserModel = new userModel();
            aUserModel.getUserByID(connection, pet.owner.id, function (err, aUser) {
                callback(err, aUser);
            });
        },
        function (aUser, callback) {
            let aPetModel = new petModel();
            aPetModel.addPet(connection, pet, function (err, returnedPet) {
                returnedPet.owner = aUser;
                callback(err, returnedPet);
            });
        }
    ], function (err, returnedPet) {
        finalCallback(err, returnedPet);
    });
}