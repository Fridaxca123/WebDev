const { run, get, all } = require('../config/db.js');

const createUser = async (name, email, password) => {
    const result = await run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    );
    return get('SELECT * FROM users WHERE id = ?', [result.lastID]);
};

const fetchAll = async () => {
    return all('SELECT id, name, email, password FROM users');
};

module.exports = { createUser, fetchAll };
