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

// Prevent unexpected DB disconnections from crashing the server
pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL pool error:', err.message);
});

// Optional: test database connection and release the client
pool.connect()
    .then((client) => {
        client.on('error', (err) => {
            console.error('PostgreSQL client error:', err.message);
        });
        client.release();
        console.log('Connected to PostgreSQL in Docker!');
    })
    .catch((err) => console.error('Database connection error:', err.message));

module.exports = pool;
