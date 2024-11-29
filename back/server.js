const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes')
const cartRoutes = require('./src/routes/cartRoutes');
const shippingRoutes = require('./src/routes/shippingRoutes');

dotenv.config(); // Cargar las variables de entorno

const app = express();

// Middleware
app.use(cors()); // Para permitir solicitudes desde diferentes orígenes
app.use(express.json()); // Para parsear JSON

// Usar las rutas de productos
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/shipping', shippingRoutes);

// Puerto en el que escuchará la aplicación
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
