//var mysql = require('mysql');
var async = require('async');
var Helper = require('../../helper');
var constants = require("../../constants");

function User() {
    this.id = null;
    this.name = null;
}

// create new user
User.prototype.addUser = function (gConnection, user, finalCallback) {
    var self = this;
    async.waterfall([

        function (callback) {
            var preparedSqlQuery = "INSERT INTO user (name) VALUES (?)";
            var values = [user.name];
            gConnection.query(preparedSqlQuery, values, function (err, results, fields) {

                if (!err && results) {
                    self.id = results.insertId;
                    self.name = user.name;
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

//get user by id
User.prototype.getUserByID = function (gConnection, userID, finalCallback) {
    var self = this;
    async.waterfall([

        function (callback) {
            var preparedSqlQuery = `select * from user where id = ${userID}`;
            gConnection.query(preparedSqlQuery, function (err, results, fields) {

                if (!err && results) {
                    if (results.length > 0) {
                        self.id = results[0].id;
                        self.name = results[0].name;
                        callback(null);
                    } else {
                        let ERR = new Error();
                        ERR.message = "Invalid user ID!!!";
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

module.exports = User;
