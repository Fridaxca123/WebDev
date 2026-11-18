//define url
const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.post('/', productController.createProduct);     // POST /usuarios

module.exports = router;