var userModel = require('../models/userModel'); //for DB connections 

// add new user
module.exports.addUserRepo = function (connection, user, finalCallback) {
    let aUserModel = new userModel();
    aUserModel.addUser(connection, user, function (err, returnedUser) {
        finalCallback(err, returnedUser);
    });
}