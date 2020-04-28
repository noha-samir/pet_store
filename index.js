var app = require('express')();
var compression = require("compression");
var bodyParser = require('body-parser');
var morgan = require('morgan');
var conn = require('./database');
var databaseSkeleton = require('./app/models/databaseSkeleton');
var constants = require('./constants');
var async = require('async');
const mysql = require('mysql');

var server = app.listen(constants.APP_PORT, function (req, res, next) {
    async.waterfall([
        function (callback) {
            console.log('App is listening on port:' + constants.APP_PORT);
            var con = mysql.createConnection({
                host: constants.DATABASE_HOST,
                user: constants.DATABASE_USER_NAME,
                password: constants.DATABASE_PASSWORD
            });

            con.connect(function (err) {
                if (err) throw err;
                var strQuery = "CREATE SCHEMA IF NOT EXISTS `pet_store` DEFAULT CHARACTER SET utf8;";
                con.query(strQuery, function (err, rows, fields) {
                    if (err) callback(err);
                    else {
                        console.log('Schema is created successfully');
                        callback(null);
                    }
                });
            });
        },
        function (callback) {
            conn.connectionWithTransaction(function (err, connection) {
                if (err) callback(err);
                else {
                    var aDatabaseSkeleton = new databaseSkeleton();
                    aDatabaseSkeleton.createTablesWithRelations(connection, function (err) {
                        if (err) callback(err);
                        else {
                            conn.releaseConnectionWithTransaction(err, connection, function (err) {
                                if (err) callback(err);
                                else {
                                    console.log('Tables and relations are created successfully with default values');
                                    callback(null);
                                }
                            });
                        }
                    });
                }
            });
        }
    ], function (err) {
        if (err) throw err;
        else {
            console.log('Database is ready :)');
        }
    });
});

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('WELCOME TO PET STORE'));

//handling /api route
app.use('/api', require('./indexRoutes'));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 400);
    res.json({
        "custom-error-code": error.code,
        "developer-message": error.developerMessage,
        "user-message": error.message,
        "additional-data": error.additionalData
    });
});

module.exports = app;