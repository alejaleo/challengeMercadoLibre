import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();

    // Si el usuario no esta autenticado, redirige al login
    if (!user) {
        return <Navigate to="/" />;
    }

    return element; // Si el usuario esta logueado, va a el componente
};

export default PrivateRoute;
