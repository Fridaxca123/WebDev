//load environment variables .env
require('dotenv').config();
//import postgres pool
const { Pool } = require('pg');
//create connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // Automatically reads 5433 from your .env
});

// Optional: tests database 
pool.connect()
    .then(() => console.log('Connected to PostgreSQL in Docker!'))
    .catch((err) => console.error('Database connection error:', err.message));

module.exports = pool;