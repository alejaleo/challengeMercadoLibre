const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Clave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET;


const register = async (req, res) => {
    const { name, lastName, address, city, phone, email, password } = req.body;

    try {
        const existingUser = await authModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        await authModel.createUser(name, lastName, address, city, phone, email, hashedPassword);
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }
        if (!user.password_hash) {
            return res.status(500).json({ message: 'Error en la configuración del usuario.' });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas en la comparacion' });
        }
        
        // Generar un token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso.', token, user });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

module.exports = {
    register,
    login
};
