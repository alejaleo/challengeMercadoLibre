const db = require('../config/db');

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) reject(err);
            if (results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};


const createUser = (name, lastName, address, city, phone, email, password_hash) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users (name, lastName, address, city, phone, email, password_hash) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [name, lastName, address, city, phone, email, password_hash], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    getUserByEmail,
    createUser,
};
