const db = require('../config/db');

const createCart = (userId, cartItems) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM carts WHERE user_id = ?',
            [userId],
            (err) => {
                if (err) {
                    reject("Error al eliminar productos del carrito: " + err);
                    return;
                }

                // Array para almacenar los resultados de las inserciones exitosas
                const insertedItems = [];
                let queriesCompleted = 0; // Contador para saber cuántas consultas se han completado
                cartItems.forEach((item, index) => {
                    db.query(
                        'INSERT INTO carts (user_id, product_id, quantity, size) VALUES (?, ?, ?, ?)',
                        [userId, item.product_id, item.quantity, item.size],
                        (err, result) => {
                            queriesCompleted++;

                            if (err) {
                                reject(`Error al insertar el producto ${item.product_id} en el carrito: ${err}`);
                                return;
                            }
                            // Agregar el elemento insertado al array
                            insertedItems.push({
                                product_id: item.product_id,
                                quantity: item.quantity,
                                size: item.size,
                            });


                            // Verificar si todas las consultas han terminado
                            if (queriesCompleted === cartItems.length) {
                                resolve({
                                    message: 'Carrito guardado exitosamente',
                                    data: insertedItems, // Enviar la data insertada
                                });
                            }
                        }
                    );
                });

                if (cartItems.length === 0) {
                    resolve({
                        message: 'No se insertaron elementos porque el carrito está vacío',
                        data: [],
                    });
                }
            }
        );
    });
};


const getCartItemsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                carts.id AS id,
                carts.quantity,
                carts.size,
                products.id AS product_id,
                products.name,
                products.price,
                products.image_url
            FROM carts
            INNER JOIN products ON carts.product_id = products.id
            WHERE carts.user_id = ?;
        `;

        db.query(query, [userId], (error, results) => {
            if (error) {
                reject("Error al obtener el carrito: " + error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { createCart, getCartItemsByUserId };
