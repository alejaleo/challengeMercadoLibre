import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

const RegisterModal = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        address: '',
        city: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const { register } = useAuth();
    const { showSnackbar } = useSnackbar();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let formErrors = {};

        // Verificar si los campos no están vacíos
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                formErrors[key] = "Este campo es obligatorio";
            }
        });

        // Validar formato del correo
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            formErrors.email = "El formato del correo no es válido";
        }

        // Validar telefono: solo números y caracteres válidos
        const phoneRegex = /^[0-9()+-\s]*$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            formErrors.phone = "El teléfono solo puede contener números, +, -, () y espacios";
        }

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // Devuelve true si no hay errores
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return; // Si hay errores de validación, no enviamos el formulario
        }

        const { name, lastName, address, city, phone, email, password } = formData;

        try {
            // Enviar datos a la API para registro
            await register(name, lastName, address, city, phone, email, password);
            showSnackbar("¡El registro fue exitoso, ya puedes iniciar sesión!", 'success');
            onClose();
        } catch (error) {
            console.error("Error en el registro:", error);
            showSnackbar("Ocurrió un error en el registro, intenta nuevamente", 'error');
        }
    };

    useEffect(() => {
        if (!open) {
            setFormData({
                name: '',
                lastName: '',
                address: '',
                city: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setErrors({});
        }
    }, [open]); 

    return (
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
                    width: 400,
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" mb={2}>Registro</Typography>
                <TextField
                    label="Nombre"
                    name="name"
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Apellidos"
                    name="lastName"
                    fullWidth
                    variant="outlined"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                />
                <TextField
                    label="Dirección"
                    name="address"
                    fullWidth
                    variant="outlined"
                    value={formData.address}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={!!errors.address}
                    helperText={errors.address}
                />
                <TextField
                    label="Ciudad"
                    name="city"
                    fullWidth
                    variant="outlined"
                    value={formData.city}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={!!errors.city}
                    helperText={errors.city}
                />
                <TextField
                    label="Teléfono"
                    name="phone"
                    fullWidth
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                <TextField
                    label="Correo"
                    name="email"
                    fullWidth
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    sx={{ marginBottom: 3 }}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                        marginTop: 2,
                        padding: 1.5,
                        color: 'yellow',
                        backgroundColor: '#000',
                        fontWeight: 'bold',
                        flex: 3,
                    }}
                >
                    Enviar
                </Button>
            </Box>
        </Modal>
    );
};

export default RegisterModal;
