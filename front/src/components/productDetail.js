import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CardMedia, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthModal from './AuthModal';
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from '../context/SnackbarContext';
import { Divider } from '@mui/material';
import { useCart } from "../context/CartContext";


const ProductDetail = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const { user } = useAuth();
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { dispatch } = useCart();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        axios.get(`${apiUrl}/api/products/${id}`)
            .then(response => {
                const data = response.data;
                if (data.sizes && typeof data.sizes === 'string') {
                    data.sizes = data.sizes.split(','); // Convertir la cadena en un arreglo
                }
                setProduct(data);
            })
            .catch(error => {
                console.error("Error al obtener el detalle del producto:", error);
            });
    }, [apiUrl, id]);

    if (!product) return <Typography variant="h6" align="center">Cargando...</Typography>;

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setErrorMessage('');
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setErrorMessage('Debe seleccionar una talla');
            return;
        }
        if (user) {
            const cartItem = {
                ...product,
                product_id: product.id,
                size: selectedSize,
                quantity: quantity,
            };
            dispatch({ payload: cartItem, type: 'ADD_ITEM' });
            showSnackbar('Producto añadido al carrito con éxito!', 'success');
        } else {
            // Si no hay usuario, abre el modal de inicio de sesión
            handleOpenModal();
        }
    };

    return (
        <>
            <Box sx={{ padding: 2, margin: 10 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={product.image_url}
                            alt={product.name}
                            sx={{
                                borderRadius: 1,
                                boxShadow: 3,
                                maxWidth: '100%',
                                maxHeight: 400,
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" gutterBottom>
                            {product.description}
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <Typography
                                variant="h5"
                                sx={{ color: 'black' }}
                            >
                                <strong>Valor: </strong>${product.price.toFixed(2)}
                            </Typography>
                        </Box>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Talla
                        </Typography>
                        {errorMessage && (
                            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                                {errorMessage}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                            {product.sizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={selectedSize === size ? 'contained' : 'outlined'}
                                    onClick={() => handleSizeChange(size)}
                                    sx={{
                                        minWidth: 50,
                                        color: selectedSize === size ? '#fff' : '#000',
                                        backgroundColor: selectedSize === size ? '#000' : '#fff',
                                    }}
                                >
                                    {size}
                                </Button>
                            ))}
                        </Box>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Cantidad
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginBottom: 2,
                                gap: 2,
                            }}
                        >
                            <Box sx={{ flex: 1, marginBottom: { xs: 2, sm: 0 } }}>
                                <Select
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    sx={{ width: '100%' }}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                                        <MenuItem key={q} value={q}>
                                            {q}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddToCart}
                                sx={{
                                    padding: 1.5,
                                    backgroundColor: '#000',
                                    fontWeight: 'bold',
                                    flex: 3, 
                                    minWidth: 150, 
                                }}
                            >
                                Añadir al Carrito
                            </Button>
                        </Box>

                    </Box>
                </Box>

                <Box sx={{ marginTop: 4 }}>
                    <Accordion  sx={{ marginBottom: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight="bold">Detalles del Producto</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {product.details}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion  sx={{ marginBottom: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight="bold">Entrega y Devoluciones</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Información de Envío y Devoluciones
                            </Typography>

                            <Typography variant="body1"  sx={{ fontWeight: 'bold' }}>
                                ENVÍO GRATIS:
                            </Typography>
                            <Typography variant="body2">
                                Disfruta de envío estándar gratuito en todos los pedidos superiores a $440,000.
                            </Typography>

                            <Typography variant="body1"  sx={{ fontWeight: 'bold' }}>
                                ENTREGA:
                            </Typography>
                            <Typography variant="body2" >
                                Tu pedido llegará en un plazo de 15 a 30 días hábiles. Realizamos entregas de lunes a viernes.
                            </Typography>

                            <Typography variant="body1"  sx={{ fontWeight: 'bold' }}>
                                DEVOLUCIONES FÁCILES:
                            </Typography>
                            <Typography variant="body2" >
                                No te preocupes si no estás conforme con tu compra. Puedes devolver tu pedido por cualquier motivo dentro de los 30 días siguientes a la recepción, sin costo adicional.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
            <AuthModal open={openModal} onClose={handleCloseModal}  />
        </>
    );
};

export default ProductDetail;
