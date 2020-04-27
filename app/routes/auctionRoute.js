var router = require('express').Router();
var auctionController = require('../controllers/auctionController');
var auctionValidation = require('../validations/auctionValidation');

//create new auction
router.post('/', auctionValidation.insertAuctionValidation, auctionController.controllerAddAuction);

//list all bids of owner
router.get('/owner/:ownerID', auctionValidation.listBidsValidation, auctionController.controllerListBids);

//list all bids of pet auction
router.get('/calculate/bids/using/GSP/pet/:petID', auctionValidation.calculateBidAmountUsingGSPValidation, auctionController.calculateBidAmountUsingGSP);

module.exports = router;