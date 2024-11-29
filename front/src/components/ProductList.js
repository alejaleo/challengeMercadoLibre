import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardMedia, CardContent, CardActions, Button, Typography } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    useEffect(() => {
        axios.get(`${apiUrl}/api/products?page=${page}&limit=${limit}`)
            .then((response) => {

                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error("Error al obtener los productos:", error);
            });
    }, [apiUrl, page]); // Dependemos de page para actualizar los productos cuando cambie la pagina


    const handlePageChange = (event, value) => {
        setPage(value);  // value es el numero de la página seleccionada
    };

    return (
        <div>
            <Box
                component="img"
                src="/assets/presentation.png"
                alt="Imagen de referencia"
                sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginBottom: '20px',
                    textAlign: 'center',
                    marginTop: "60px"
                }}
            />
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    fontWeight: 'bold',
                    color: '#000'
                }}
            >
                Nuestras botas Disponibles
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "10px",
                }}
            >
                {products.length > 0 ? (
                    products.map((product) => (
                        <Card
                            key={product.id}
                            sx={{
                                width: "250px",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: 3,
                            }}
                        >
                            {product.image_url && (
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={product.image_url}
                                    alt={product.name}
                                />
                            )}

                            <CardContent>
                                <Typography variant="h6" component="div" noWrap>
                                    {product.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary" sx={{ marginTop: 1 }}>
                                <strong>Valor:</strong> ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>

                            <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',  
                                    width: '100%', 
                                }}
                            >
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', width: '80%' }}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            padding: "6px 12px",
                                            backgroundColor: "#000", 
                                            color: "#fff", 
                                            width: '100%', 
                                        }}
                                    >
                                        Ver más
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1" align="center">
                        Cargando productos...
                    </Typography>
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '40px' }}>
                <Pagination
                    count={totalPages} // Total de páginas
                    page={page} // Página actual
                    onChange={handlePageChange} // Función para cambiar la página
                    color="primary"
                />
            </Box>
        </div>
    );
};

export default ProductList;
