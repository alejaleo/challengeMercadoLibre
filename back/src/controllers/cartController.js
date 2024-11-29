const cartModel = require('../models/CartModel');


const saveCart = async (req, res) => {
    const { userId, cartItems } = req.body;
    // Validamos que los datos requeridos estén presentes
    if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ error: 'Datos insuficientes o inválidos' });
    }
    try {
        const result = await cartModel.createCart(userId, cartItems);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al guardar el carrito:', error.message);
        res.status(500).json({ error: 'Error al guardar el carrito' });
    }
};

const getCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const cartItems = await cartModel.getCartItemsByUserId(userId);
        if (cartItems.length === 0) {
            return res.status(200).json({ items: [], message: "El carrito está vacío" });
        }
        res.status(200).json({ items: cartItems });
    } catch (error) {
        console.error("Error interno:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


module.exports = {
    saveCart,
    getCartByUserId
};
