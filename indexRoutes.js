var router = require('express').Router();

//Allow CORS
router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    global.req = req;

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, X-Custom-Header, Content-Type, Accept, Authorization, errorcode, errormessage, server-name ,version-number,x-access-token,platform-number');
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Expose-Headers', "errorcode, errormessage, server-name");

    //Add server name 
    //res.header('server-name', 'server');

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
        return;
    }
    next();
});

router.use(function (req, res, next) {
    //Authentication logic
    next();
});

//All APIs
router.use('/v1/user', require('./app/routes/userRoute'));
router.use('/v1/pet', require('./app/routes/petRoute'));
router.use('/v1/auction', require('./app/routes/auctionRoute'));

module.exports = router;