const db = require('../config/db'); // Configuración de la base de datos


const getAllShippingCosts = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM shipping_options';
        db.query(query, (error, results) => {
            if (error) {
                return reject(error); 
            }
            resolve(results); 
        });
    });
};

module.exports = { getAllShippingCosts };
