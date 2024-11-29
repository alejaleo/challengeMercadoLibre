// src/routes/cartRoutes.js
const express = require('express');
const { saveCart, getCartByUserId } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para guardar el carrito
router.post('/saveCart',verifyToken, saveCart);
// Ruta para ver el carrito que tiene guardado el usuario
router.get('/:userId', verifyToken, getCartByUserId);
module.exports = router;
