var app = require('express')();
var compression = require("compression");
var bodyParser = require('body-parser');
var morgan = require('morgan');
var conn = require('./database');
var databaseSkeleton = require('./app/models/databaseSkeleton');
var async = require('async');
var constants = require('./constants');

var server = app.listen(3050, function (req, res, next) {

    console.log('App is listening on port: 3050');

    async.waterfall([
        function (callback) {
            conn.connection.query("CREATE schema IF NOT EXISTS `pet_store` DEFAULT CHARACTER SET utf8;", function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    console.log('Schema is created successfully');
                    callback(null);
                }
            });
        },
        function (callback) {
            conn.connectionWithTransaction(callback);
        },
        function (connection, callback) {
            var aDatabaseSkeleton = new databaseSkeleton();
            aDatabaseSkeleton.createTablesWithRelations(connection, function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    console.log('Tables and relations are created successfully with default values');
                    callback(null, connection);
                }
            });
        }
    ], function (err, connection) {
        if (err) {
            throw err;
        } else {
            conn.releaseConnectionWithTransaction(err, connection, function () {
                if (err) {
                    throw err;
                }
                else {
                    console.log('Database is ready :)');
                }
            });
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