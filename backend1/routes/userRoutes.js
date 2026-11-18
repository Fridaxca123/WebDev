//define url
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);     // POST /usuarios
router.get('/', userController.getUsers);

module.exports = router;