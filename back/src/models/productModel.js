const db = require('../config/db');


const formatProducts = (products) => {
    return products.map(product => ({
        ...product,
        price: parseFloat(product.price), 
    }));
};

const formatProduct = (product) => {
    return {
        ...product,
        price: parseFloat(product.price), 
    };
};

const getAllProducts = (limit, offset) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM products LIMIT ? OFFSET ?';
        db.query(query, [limit, offset], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const formattedResults = formatProducts(results);
                resolve(formattedResults);
            }
        });
    });
};

const countProducts = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS total FROM products';
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {

                resolve(results[0].total);  // Devuelve el número total de productos
            }
        });
    });
};


const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
            if (err) reject(err);
            const formattedProduct = formatProduct(results[0]);
            resolve(formattedProduct);
        });
    });
};



module.exports = {
    getAllProducts,
    countProducts,
    getProductById
};
