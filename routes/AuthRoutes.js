const express = require ('express');
const router = express.Router();

const { UserController } = require('../controllers')
const { UserValidator } = require('../validators')

router.post('/login', UserController.login)
router.post('/signup', UserValidator.create, UserController.signup)

module.exports = router;
