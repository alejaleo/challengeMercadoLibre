// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;  

// Middleware para validar el token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;  
        next();  // Continuar con la ejecución de la siguiente función o controlador
    } catch (error) {
        return res.status(403).json({ message: 'Token no válido.' }); 
    }
};

module.exports = { verifyToken };
