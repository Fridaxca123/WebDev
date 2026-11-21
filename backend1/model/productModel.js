const pool = require('../config/db.js')

const createProduct = async (product_name, price, quantity) => {
    const res = await pool.query(
        'INSERT INTO products (product_name, price, quantity) VALUES ($1, $2, $3) RETURNING *',
        [product_name, price, quantity]
    );
    return res.rows[0];
};

const deleteProduct = async (product_id) => {
    const res = await pool.query(
        'DELETE FROM products WHERE product_id = $1 RETURNING *',
        [product_id]
    );
    return res.rows[0];
}
module.exports = { createProduct, deleteProduct };