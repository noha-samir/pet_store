var router = require('express').Router();
var auctionController = require('../controllers/auctionController');
var auctionValidation = require('../validations/auctionValidation');

//create new auction
router.post('/', auctionValidation.insertAuctionValidation, auctionController.controllerAddAuction);

//list all bids of owner
router.get('/owner/:ownerID', auctionValidation.listBidsValidation, auctionController.controllerListBids);

module.exports = router;