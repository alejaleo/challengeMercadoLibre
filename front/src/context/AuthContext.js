// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const { cart, clearCart, dispatch } = useCart();


    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
            if (!response.data || !response.data.token || !response.data.user) {
                throw new Error("Datos de respuesta incompletos del servidor");
            }
            const { token, user } = response.data;
            setToken(token);
            setUser(user);

            try {
                const cartResponse = await axios.get(`${apiUrl}/api/cart/${user.id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                if (!cartResponse?.data?.items) {
                    console.warn("No se encontraron elementos en el carrito del usuario");
                    dispatch({ type: 'SET_CART_ITEMS', payload: [] });
                } else {
                    const activeCartItems = cartResponse.data.items;
                    dispatch({ type: 'SET_CART_ITEMS', payload: activeCartItems });
                }
            } catch (cartError) {
                console.error("Error al cargar el carrito:", cartError);
            }
        } catch (loginError) {
            console.error("Error durante el inicio de sesión:", loginError);
            throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    };

    const register = async (name, lastName, address, city, phone, email, password) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/register`, {
                name,
                lastName,
                address,
                city,
                phone,
                email,
                password
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
        } catch (error) {
            throw new Error('Error al registrarse');
        }
    };

    const logout = async () => {
        if (cart.items.length > 0) { // Verificamos si el carrito tiene elementos
            try {
                // Enviar el carrito al backend antes de cerrar sesión
                await axios.post(`${apiUrl}/api/cart/saveCart`, {
                    userId: user.id,    
                    cartItems: cart.items,  
                },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                clearCart();
            } catch (error) {
                console.error('Error al guardar el carrito:', error);
            }
        }

        // Ahora cerramos sesión
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
