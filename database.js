const mysql = require('mysql');
var async = require('async');
var constants = require('./constants');

//queueLimit:10, limit pending connection queue
const pool = mysql.createPool({
    connectionLimit: "100",
    queueLimit: 10,
    multipleStatements: true,
    host: constants.DATABASE_HOST,
    port: constants.DATABASE_PORT,
    user: constants.DATABASE_USER_NAME,
    password: constants.DATABASE_PASSWORD,
    database: constants.DATABASE_NAME
});

module.exports.connectionWithTransaction = function (finalCallback) {
    let aConnection = null;

    async.waterfall([
        function (callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err);
                } else {
                    aConnection = connection;
                    //let logString = global.req.method + " " + global.req.baseUrl + global.req.url + "  " + aConnection.threadId + "\n\n";
                    //fs.appendFile('RequestThreads.txt', logString, function () { });
                    callback(null);
                }
            });
        },
        function (callback) {
            aConnection.query(" set @@SESSION.time_zone='+02:00' ", function (err) {
                callback(err);
            });
        },
        function (callback) {
            aConnection.query(" set @@SESSION.sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' ", function (err) {
                callback(err);
            });
        },
        function (callback) {
            aConnection.beginTransaction(function (err) {
                callback(err);
            });
        }

    ], function (err) {
        finalCallback(err, aConnection);
    })
}

module.exports.releaseConnectionWithTransaction = function (err, aConnection, callback) {
    if (!aConnection) {
        let error = new Error();
        error.code = "DATABASE_ERROR";
        error.developerMessage = "DB Connection error";
        error.message = "Something went wrong..";
        callback(error);
    }
    else if (err) {
        aConnection.rollback(function () {
            aConnection.release();
            callback(err);
        })
    }
    else {
        aConnection.commit(function (err) {
            if (err) {
                aConnection.rollback(function () {
                    aConnection.release();
                    callback(err);
                });
            }
            else {
                aConnection.release();
                callback(null);
            }
        });
    }
}

module.exports.connectionWithoutTransaction = function (finalCallback) {
    let aConnection = null;

    async.waterfall([
        function (callback) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    callback(err);
                } else {
                    aConnection = connection;
                    //let logString = global.req.method + " " + global.req.baseUrl + global.req.url + "  " + aConnection.threadId + "\n\n";
                    //fs.appendFile('RequestThreads.txt', logString, function () { });
                    callback(null);
                }
            });
        },
        function (callback) {
            aConnection.query(" set @@SESSION.time_zone='+02:00' ", function (err) {
                callback(err);
            });
        },
        function (callback) {
            aConnection.query(" set @@SESSION.sql_mode = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' ", function (err) {
                callback(err);
            });
        }
    ], function (err) {
        finalCallback(err, aConnection);
    })
}

module.exports.releaseConnectionWithoutTransaction = function (err, aConnection, callback) {
    if (!aConnection) {
        let error = new Error();
        error.code = "DATABASE_ERROR";
        error.developerMessage = "DB Connection error";
        error.message = "Something went wrong..";
        callback(error);
    }
    else if (err) {
        aConnection.release();
        callback(err);
    }
    else {
        aConnection.release();
        callback(null);
    }
}

module.exports.pool = pool;