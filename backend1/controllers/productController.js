
const productModel = require('../model/productModel');

const createProduct = async (req, res) => {
    try {
        const { product_name, price, quantity } = req.body;

        // Validate required fields
        if (
            !product_name?.trim() ||
            price === undefined || price === null || price === '' ||
            quantity === undefined || quantity === null || quantity === ''
        ) {
            return res.status(400).json({
                error: 'All the fields are required'
            });
        }

        // Convert numbers
        const parsedPrice = Number(price);
        const parsedQuantity = Number(quantity);

        // Validate numbers
        if (
            !Number.isFinite(parsedPrice) || parsedPrice < 0 ||
            !Number.isInteger(parsedQuantity) || parsedQuantity < 0
        ) {
            return res.status(400).json({
                error: 'Invalid price or quantity'
            });
        }

        const newProduct = await productModel.createProduct(
            product_name.trim(),
            parsedPrice,
            parsedQuantity
        );

        return res.status(201).json(newProduct);

    } catch (error) {
        console.error('createProduct error:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const productId = Number(id);

        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({
                error: 'Invalid product ID'
            });
        }

        const deletedProduct = await productModel.deleteProduct(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        // Send response
        return res.status(200).json({
            message: 'Product deleted successfully',
            product: deletedProduct
        });


    } catch (error) {
        console.error('deleteProduct error:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productModel.getProducts();
        res.status(200).json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving producst' });

    }
}

const changeProduct = async (req, res) => {
    try {
        const { product_name, price, quantity } = req.body;
        // Get product ID from URL
        const { id } = req.params;
        const productId = Number(id);

        // Validate ID
        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({
                error: 'Invalid product ID'
            });
        }

        // Call model
        const changeProduct = await productModel.changeProduct(
            productId, product_name, price, quantity
        );

        // Check if product exists
        if (!changeProduct) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        // Send response
        return res.status(200).json({
            message: 'Product changed successfully',
            product: changeProduct
        });


    } catch (error) {
        console.error('changeProduct error:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}

module.exports = { createProduct, deleteProduct, getProducts, changeProduct };
