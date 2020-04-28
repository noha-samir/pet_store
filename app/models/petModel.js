var async = require('async');
var User = require("./userModel");

function Pet() {
    this.id = null;
    this.type = null;
    this.name = null;
    this.owner = new User();
}

// create new Pet
Pet.prototype.addPet = function (gConnection, pet, finalCallback) {
    var self = this;
    async.waterfall([

        function (callback) {
            var preparedSqlQuery = "INSERT INTO pet (type,name,owner_id) VALUES (?,?,?)";
            var values = [pet.type, pet.name, pet.owner.id];
            gConnection.query(preparedSqlQuery, values, function (err, results, fields) {
                if (!err && results) {
                    self.id = results.insertId;
                    self.type = pet.type;
                    self.name = pet.name;
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

//get pet by id
Pet.prototype.getPetByID = function (gConnection, petID, finalCallback) {
    var self = this;
    async.waterfall([
        function (callback) {
            var preparedSqlQuery = `select * from pet where id = ${petID}`;
            gConnection.query(preparedSqlQuery, function (err, results, fields) {
                if (!err && results) {
                    if (results.length > 0) {
                        self.id = results[0].id;
                        self.type = results[0].type;
                        self.name = results[0].name;
                        self.owner = { "id": results[0].owner_id };
                        callback(null);
                    } else {
                        let ERR = new Error();
                        ERR.message = "Invalid pet ID!!!";
                        callback(ERR);
                    }
                }
                else {
                    callback(err);
                }
            });
        },
        function (callback) {
            let aUser = new User();
            aUser.getUserByID(gConnection, self.owner.id, function (err, user) {
                self.owner = user;
                callback(err);
            });
        }
    ],
        function (err) {
            finalCallback(err, self);
        });
};

module.exports = Pet;
