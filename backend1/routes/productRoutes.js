//define url
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);     // POST /products
router.delete('/:id', productController.deleteProduct)

module.exports = router;