const { run, get, exec } = require('../config/db');
const fs = require('fs');
const path = require('path');

const backupPath = path.join(__dirname, 'backup.json');
const initSQL = fs.readFileSync(path.join(__dirname, '..', 'init.sql'), 'utf8');

async function importData() {
    await exec(initSQL);

    if (!fs.existsSync(backupPath)) {
        console.log('No backup.json found. Skipping data import.');
        return;
    }

    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

    for (const user of backup.users) {
        const existing = await get('SELECT id FROM users WHERE id = ?', [user.id]);
        if (existing) continue;
        await run(
            'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
            [user.id, user.name, user.email, user.password]
        );
    }

    for (const product of backup.products) {
        const existing = await get('SELECT product_id FROM products WHERE product_id = ?', [product.product_id]);
        if (existing) continue;
        await run(
            'INSERT INTO products (product_id, product_name, price, quantity) VALUES (?, ?, ?, ?)',
            [product.product_id, product.product_name, product.price, product.quantity]
        );
    }

    console.log(`Imported ${backup.users.length} users and ${backup.products.length} products.`);
}

importData().catch((err) => {
    console.error('Migration failed:', err.message);
    process.exit(1);
});
