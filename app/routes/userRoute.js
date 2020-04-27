var router = require('express').Router();
var userController = require('../controllers/userController');
var userValidation = require('../validations/userValidation');

//create new user
router.post('/', userValidation.insertUserValidation, userController.controllerAddUser);

module.exports = router;