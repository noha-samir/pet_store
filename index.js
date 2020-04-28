var app = require('express')();
var compression = require("compression");
var bodyParser = require('body-parser');
var morgan = require('morgan');
var conn = require('./database');
var databaseSkeleton = require('./app/models/databaseSkeleton');
var constants = require('./constants');

var server = app.listen(constants.APP_PORT, function (req, res, next) {

    conn.connectionWithTransaction(function (err, connection) {
        if (err) throw err;
        else {
            var aDatabaseSkeleton = new databaseSkeleton();
            aDatabaseSkeleton.createTablesWithRelations(connection, function (err) {
                if (err) throw err;
                else {
                    conn.releaseConnectionWithTransaction(err, connection, function (err) {
                        if (err) throw err;
                        else {
                            console.log('Tables and relations are created successfully with default values:), Database is ready');
                        }
                    });
                }
            });
        }
    });
    console.log('App is listening on port:' + constants.APP_PORT);
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