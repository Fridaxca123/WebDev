require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente' });
});

const PORT = process.env.PORT || 3000;
const initSQL = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

exec(initSQL)
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
