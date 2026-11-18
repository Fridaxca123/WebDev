
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

module.exports = { createProduct };
