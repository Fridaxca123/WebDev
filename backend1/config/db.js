require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // Automatically reads 5433 from your .env
});

// Optional: Prints a confirmation in the terminal when Node connects to Docker
pool.connect()
    .then(() => console.log('Connected to PostgreSQL in Docker!'))
    .catch((err) => console.error('Database connection error:', err.message));

module.exports = pool;