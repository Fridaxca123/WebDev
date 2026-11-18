const pool = require('../config/db.js')

const createProduct = async (product_name, price, quantity) => {
    const res = await pool.query(
        'INSERT INTO PRODUCTS (product_name, price, quantity) VALUES ($1, $2, $3 ) RETURNING*'
        [product_name, price, quantity]
    );
    return res.row[0];
};
module.exports = { createProduct };