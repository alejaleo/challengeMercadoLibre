import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import ProductDetail from "./components/productDetail";
import DeliveryOption from "./components/DeliveryOption";
import PrivateRoute from './components/Guard/privateRoute';

function App() {
  return (
    <SnackbarProvider>
      <CartProvider>
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="*" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/delivery" element={<PrivateRoute element={<DeliveryOption />} />}/>
              <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
            </Routes>
          </Router>
        </AuthProvider>
      </CartProvider>
    </SnackbarProvider>
  );
}

export default App;
