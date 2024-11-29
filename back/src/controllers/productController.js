const productModel = require('../models/productModel');


const getAllProducts = async (req, res) => {
    try {
        // Obtener los parámetros de página y límite desde la consulta de la URL
        const page = parseInt(req.query.page) || 1;  
        const limit = parseInt(req.query.limit) || 10;  

        // Calcular el offset (desplazamiento) para la consulta
        const offset = (page - 1) * limit;

        // Obtener los productos con paginación
        const products = await productModel.getAllProducts(limit, offset);

        // Contar el total de productos para calcular el número total de páginas
        const totalProducts = await productModel.countProducts();

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalProducts / limit);

        // Enviar la respuesta con los productos, total de productos y total de páginas
        res.json({
            products,
            totalProducts,
            totalPages,
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err });
    }
};


const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err });
    }
};



module.exports = {
    getAllProducts,
    getProductById
};
