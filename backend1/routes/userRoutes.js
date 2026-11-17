//define url
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);     // POST /usuarios

module.exports = router;