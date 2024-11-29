import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SuccessModal = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                    width: 400,
                }}
            >
                <Typography id="success-modal-title" variant="h6" component="h2">
                    ¡Tu compra ha sido exitosa!
                </Typography>
                <Typography id="success-modal-description" sx={{ mt: 2 }}>
                    Se descontará el total del valor de tu tarjeta registrada, tu pedido llegará en un plazo de 5 días hábiles.
                </Typography>

                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 3,
                            width: '100%',
                            fontWeight: "bold",
                            backgroundColor: "#000", // Color negro
                            color: "#fff"
                        }}
                    >
                        Aceptar
                    </Button>
                </Link>
            </Box>
        </Modal>
    );
};

export default SuccessModal;
