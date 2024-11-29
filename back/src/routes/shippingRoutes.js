const express = require('express');
const router = express.Router();
const { getAllShippingCosts } = require('../controllers/shippingController');
const { verifyToken } = require('../middleware/authMiddleware');

// Ruta para obtener todos los costos de envío
router.get('/shippingCost',verifyToken, getAllShippingCosts);

module.exports = router;