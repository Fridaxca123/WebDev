const { run, get, all } = require('../config/db.js');

const createProduct = async (product_name, price, quantity) => {
    const result = await run(
        'INSERT INTO products (product_name, price, quantity) VALUES (?, ?, ?)',
        [product_name, price, quantity]
    );
    return get('SELECT * FROM products WHERE product_id = ?', [result.lastID]);
};

const deleteProduct = async (product_id) => {
    const product = await get('SELECT * FROM products WHERE product_id = ?', [product_id]);
    if (!product) return null;
    await run('DELETE FROM products WHERE product_id = ?', [product_id]);
    return product;
};

async function changeProduct(product_id, product_name, price, quantity) {
    const product = await get('SELECT * FROM products WHERE product_id = ?', [product_id]);
    if (!product) return null;
    await run(
        'UPDATE products SET product_name = ?, price = ?, quantity = ? WHERE product_id = ?',
        [product_name, price, quantity, product_id]
    );
    return get('SELECT * FROM products WHERE product_id = ?', [product_id]);
}

async function getProducts() {
    return all('SELECT product_id, product_name, price, quantity FROM products');
}

module.exports = { createProduct, deleteProduct, getProducts, changeProduct };
