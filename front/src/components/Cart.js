import React from "react";
import { useCart } from "../context/CartContext";
import { Button, Box, Typography, IconButton, CardMedia, Divider } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";  // Importamos Link

const Cart = () => {
    const { cart, dispatch } = useCart();


    const handleRemoveItem = (item) => {
        dispatch({ type: "REMOVE_ITEM", payload: item });
    };

    const handleUpdateQuantity = (item, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity } });
    };

    const calculateSubtotal = () => {
        return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Box sx={{ padding: 4, marginTop: "64px" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                El Carrito De La Compra
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            {cart.items.length === 0 ? (
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" color="gray" sx={{ marginBottom: 2 }}>Tu carrito está vacío.</Typography>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                width: '30%',
                                padding: "6px 12px",
                                fontWeight: "bold",
                                backgroundColor: "#000", 
                                color: "yellow", 

                            }}
                        >
                            Volver a comprar
                        </Button>
                    </Link>
                </Box>
            ) : (
                <>
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold", flex: 2 }}>
                            Producto
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold", flex: 1, textAlign: "center" }}>
                            Cantidad
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold", flex: 1, textAlign: "center" }}>
                            Valor
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold", flex: 1, textAlign: "center" }}>
                            Eliminar
                        </Typography>
                    </Box>
                    <Divider sx={{ marginY: 2 }} />
                    {cart.items.map((item, index) => (
                        <Box key={index} sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flex: 2, display: "flex", alignItems: "center", gap: 2 }}>
                                <CardMedia
                                    component="img"
                                    image={item.image_url}
                                    alt={item.name}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        objectFit: "contain",
                                    }}
                                />
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Talla: {item.size}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <IconButton
                                    onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="body1" sx={{ margin: "0 10px" }}>
                                    {item.quantity}
                                </Typography>
                                <IconButton
                                    onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Typography variant="body1">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <IconButton onClick={() => handleRemoveItem(item)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                    <Divider sx={{ marginY: 2 }} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Sub-Total: ${calculateSubtotal().toFixed(2)}
                        </Typography>
                    </Box>
                    <Divider sx={{ marginY: 2 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Button variant="outlined"
                                sx={{
                                    padding: "6px 12px",
                                    fontWeight: "bold",
                                    backgroundColor: "#000", 
                                    color: "yellow", 
                                    width: '100%', 
                                }}
                            >
                                Continuar Comprando
                            </Button>
                        </Link>
                        <Link to="/delivery" style={{ textDecoration: "none" }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#000",
                                    fontWeight: "bold",
                                }}
                            >
                                Realizar Pedido
                            </Button>
                        </Link>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Cart;
