require('dotenv').config(); // 1. Load variables from .env first
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pool = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// 2. Create the Express application
const app = express();

// 3. Middlewares (run on every incoming request before reaching your routes)
app.use(cors());         // Allows your frontend (e.g., Live Server) to talk to this API
app.use(express.json()); // Translates incoming JSON bodies into req.body

// 4. Mount your MVC Routes
// Any request starting with /user is forwarded to userRoutes.js
app.use('/user', userRoutes);
app.use('/products', productRoutes);

// Optional health-check route to verify the server works in your browser
app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente' });
});

// 5. Initialize database tables then start listening for requests
const PORT = process.env.PORT || 3000;
const initSQL = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

pool.query(initSQL)
    .then(() => {
        console.log('Database tables initialized');
        app.listen(PORT, () => {
            console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to initialize database tables:', err.message);
        process.exit(1);
    });