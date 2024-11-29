import React, { useState, useEffect } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Button, Card, CardContent, Divider } from '@mui/material';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from 'react-router-dom';
import SuccessModal from './SuccesModal';

const DeliveryOption = () => {
    const [selectedDelivery, setSelectedDelivery] = useState('domicilio');
    const [standarShipping, setStandarShipping] = useState(0);
    const [expressShipping, setExpressShipping] = useState(0);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useAuth();
    const { cart, dispatch } = useCart();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchShippingData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/shipping/shippingCost`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // Iterar sobre el arreglo shippingCosts y buscar los costos de envío
                const shippingCosts = response.data.shippingCosts;
                shippingCosts.forEach((shipping) => {
                    if (shipping.name === 'Standard Shipping') {
                        setStandarShipping(parseFloat(shipping.price));
                    } else if (shipping.name === 'Express Shipping') {
                        setExpressShipping(parseFloat(shipping.price));
                    }
                });
            } catch (error) {
                console.error('Error al obtener los costos de envío:', error);
            }
        };

        fetchShippingData();
    }, [apiUrl, token]);

    const calculateTotal = () => {
        const productTotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingCost = selectedDelivery === 'domicilio' ? standarShipping : expressShipping;
        return (productTotal + shippingCost).toFixed(2);
    };

    const handleContinue = () => {

        setModalOpen(true);
        dispatch({ type: 'SET_CART_ITEMS', payload: [] });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, marginTop: "64px", gap: 4 }}>
            <Box sx={{ flex: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Elige la forma de entrega
                </Typography>
                <RadioGroup
                    value={selectedDelivery}
                    onChange={(e) => setSelectedDelivery(e.target.value)}
                >
                    <Card sx={{ mb: 2, border: selectedDelivery === 'domicilio' ? '2px solid #1976d2' : '1px solid #ccc' }}>
                        <CardContent>
                            <FormControlLabel
                                value="domicilio"
                                control={<Radio sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />}
                                label={
                                    <Typography variant="body1">
                                        Enviar a domicilio
                                    </Typography>
                                }
                            />
                            <Divider sx={{ marginY: 2 }} />
                            <Box sx={{ pl: 2 }}>
                                <Typography variant="body2">
                                    <strong>Dirección:</strong> {user?.address || "No hay dirección disponible"}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Ciudad:</strong> {user?.city || "No hay ciudad disponible"}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Nombre:</strong> {user?.name || "No hay nombre disponible"} {user?.lastname || ""}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Teléfono:</strong> {user?.phone || "No hay teléfono disponible"}
                                </Typography>
                                <Divider sx={{ marginY: 2 }} />
                                <Typography variant="body2">
                                    <strong>Costo de envío:</strong> ${standarShipping.toFixed(2)} {/* Asegura 2 decimales */}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, border: selectedDelivery === 'punto' ? '2px solid #1976d2' : '1px solid #ccc' }}>
                        <CardContent>
                            <FormControlLabel
                                value="punto"
                                control={<Radio sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />}
                                label={
                                    <Typography variant="body1">
                                        Retirar en un punto de entrega
                                    </Typography>
                                }
                            />
                            <Divider sx={{ marginY: 2 }} />
                            <Box sx={{ pl: 2 }}>
                                <Typography variant="body2">
                                    <strong>Dirección:</strong> Cra 78n # 42 c 41 - Local 203 - Bogotá D.C.
                                </Typography>
                                <Divider sx={{ marginY: 2 }} />
                                <Typography variant="body2">
                                    <strong>Costo de entrega:</strong> ${expressShipping.toFixed(2)} {/* Asegura 2 decimales */}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </RadioGroup>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 2 }}>
                    <Link to="/cart" style={{ textDecoration: 'none', flexGrow: 1 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                padding: "6px 12px",
                                fontWeight: "bold",
                                backgroundColor: "#000", 
                                color: "yellow", 
                                width: '100%',
                            }}
                        >
                            Volver al Carrito
                        </Button>
                    </Link>
                    <Button
                        onClick={handleContinue}
                        variant="contained"
                        color="primary"
                        sx={{
                            flexGrow: 1,
                            fontWeight: "bold",
                            backgroundColor: "#000", 
                            color: "#fff", 
                            
                        }} 
                    >
                        Realizar Pago
                    </Button>
                </Box>
            </Box>


            <Box sx={{ flex: 1, backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                <Typography variant="h5" fontWeight={"bold"} gutterBottom>
                    Resumen de compra
                </Typography>
                <Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', mb: 2, py: 1 }}>
                        <Typography variant="body1">Productos</Typography>
                        <Typography variant="body1">
                            ${cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} {/* Asegura 2 decimales */}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', mb: 2, py: 1 }}>
                        <Typography variant="body1">Costo de Envío</Typography>
                        <Typography variant="body1">
                            ${selectedDelivery === 'domicilio' ? standarShipping.toFixed(2) : expressShipping.toFixed(2)} {/* Asegura 2 decimales */}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total a pagar</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            ${calculateTotal()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Box>
    );
};

export default DeliveryOption;
