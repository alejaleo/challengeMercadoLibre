import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import RegisterModal from './RegisterModal';
import { useSnackbar } from '../context/SnackbarContext';

const AuthModal = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const { login } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        // Expresión regular para validar el formato del correo
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        setEmailError(''); // Resetear errores
        setPasswordError('');

        // Validar campos vacíos y formato de correo
        if (!email || !password) {
            if (!email) setEmailError('El correo no puede estar vacío');
            if (!password) setPasswordError('La contraseña no puede estar vacía');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Por favor, ingrese un correo electrónico válido');
            return;
        }

        try {
            await login(email, password);
            showSnackbar("¡El inicio de sesión fue exitoso!", 'success');
            onClose(); 
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            showSnackbar(error.message, 'error');
        }
    };

    const handleOpenRegister = () => {
        onClose(); // Cerrar el modal de inicio de sesión
        setIsRegisterOpen(true); // Abrir el modal de registro
    };

    const handleCloseRegister = () => {
        setIsRegisterOpen(false); // Cerrar el modal de registro
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: 4,
                        boxShadow: 24,
                        width: 300,
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h6" mb={2}>Iniciar Sesión</Typography>
                    <TextField
                        label="Correo"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ marginBottom: 1 }}
                        error={!!emailError} // Mostrar error si existe
                        helperText={emailError} // Texto de error debajo del campo
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: 3 }}
                        error={!!passwordError} // Mostrar error si existe
                        helperText={passwordError} // Texto de error debajo del campo
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleLogin}
                        color="primary"
                        sx={{
                            padding: 1.5,
                            backgroundColor: '#000',
                            fontWeight: 'bold',
                            flex: 3,
                            minWidth: 150,
                        }}
                    >
                        Iniciar sesión
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{
                            marginTop: 2,
                            padding: 1.5,
                            color: 'yellow',
                            backgroundColor: '#000',
                            fontWeight: 'bold',
                            flex: 3,
                        }}
                        onClick={handleOpenRegister}
                    >
                        Registrarse
                    </Button>
                </Box>
            </Modal>
            <RegisterModal open={isRegisterOpen} onClose={handleCloseRegister} />
        </>
    );
};

export default AuthModal;
