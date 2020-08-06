const express = require ('express');
const router = express.Router();

const { UserController } = require('../controllers')
const { UserValidator } = require('../validators')
const { verifyToken }= require('../middlewares')

router.get('/users', verifyToken, UserController.findAll);
router.get('/users/:id', verifyToken, UserController.findOne);
router.post('/users', verifyToken, UserValidator.create, UserController.create);
router.patch('/users/:id', verifyToken, UserValidator.edit, UserController.edit);
router.delete('/users/:id', verifyToken, UserController.eliminate)

module.exports = router;