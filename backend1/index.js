require('dotenv').config(); // 1. Load variables from .env first
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');

// 2. Create the Express application
const app = express();

// 3. Middlewares (run on every incoming request before reaching your routes)
app.use(cors());         // Allows your frontend (e.g., Live Server) to talk to this API
app.use(express.json()); // Translates incoming JSON bodies into req.body

// 4. Mount your MVC Routes
// Any request starting with /usuarios is forwarded to usuarioRoutes.js
app.use('/usuarios', usuarioRoutes);

// Optional health-check route to verify the server works in your browser
app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente' });
});

// 5. Start listening for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});