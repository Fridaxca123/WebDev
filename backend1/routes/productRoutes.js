//define url
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);     // POST /products
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.getProducts);
router.patch('/:id', productController.changeProduct);

module.exports = router;