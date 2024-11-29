import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useAuth } from "../context/AuthContext";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";



const Navbar = () => {
    const [openModal, setOpenModal] = useState(false);
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const totalItemsInCart = cart.items.reduce((total, item) => total + item.quantity, 0);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#FFD700", color: "#000" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <Box
                            component="img"
                            sx={{
                                height: 40,
                                mr: 2,
                            }}
                            alt="Logo"
                            src="/assets/bota.png"
                        />
                        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "24px", color: "black" }}>
                            Air wair
                        </Typography>
                    </Link>

                    
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        
                        {user && (
                            <Link to="/cart" style={{ textDecoration: "none" }}>
                                <IconButton size="large" aria-label="cart" color="inherit">
                                    <Badge badgeContent={totalItemsInCart} color="error">
                                        <ShoppingCartIcon sx={{ color: 'black' }} />
                                    </Badge>
                                </IconButton>
                            </Link>
                        )}

                        {user ? (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={handleLogout}
                                sx={{
                                    padding: "6px 12px",
                                    backgroundColor: "#000", 
                                    color: "#fff", 
                                    ml: 2, 
                                }}
                            >
                                Cerrar sesión
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={handleOpenModal}
                                sx={{
                                    padding: "6px 12px",
                                    backgroundColor: "#000", 
                                    color: "#fff", 
                                    ml: 2, 
                                }}
                            >
                                Iniciar sesión
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <AuthModal open={openModal} onClose={handleCloseModal} />
        </>
    );
};

export default Navbar;
