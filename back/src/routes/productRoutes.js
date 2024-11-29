const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para  productos
router.get('/', productController.getAllProducts); // Obtener todos los productos
router.get('/:id', productController.getProductById); // Obtener un producto por ID


module.exports = router;
