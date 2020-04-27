var router = require('express').Router();
var petController = require('../controllers/petController');
var userValidation = require('../validations/petValidation');

//create new pet
router.post('/', userValidation.inserPetValidation, petController.controllerAddPet);

module.exports = router;