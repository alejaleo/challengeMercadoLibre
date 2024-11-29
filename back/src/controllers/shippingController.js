const shippingModel = require('../models/shippingModel'); // Importar el modelo de costos de envío

const getAllShippingCosts = async (req, res) => {
    try {
        const shippingCosts = await shippingModel.getAllShippingCosts();
        if (!shippingCosts || shippingCosts.length === 0) {
            return res.status(404).json({ message: 'No se encontraron costos de envío' });
        }
        res.json({ shippingCosts });
    } catch (err) {
        console.error('Error al obtener los costos de envío:', err);
        res.status(500).json({ message: 'Error al obtener los costos de envío', error: err });
    }
};

module.exports = { getAllShippingCosts };
