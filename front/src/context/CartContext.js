import React, { createContext, useReducer, useContext } from "react";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const initialState = {
    items: [],
    total: 0,
};

const cartReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_ITEM': {
            const newItem = action.payload;
            // Verificar si el producto con el mismo ID y talla ya existe en el carrito
            const existingItemIndex = state.items.findIndex(
                item => item.product_id === newItem.id && parseInt(item.size) === parseInt(newItem.size)
            );

            if (existingItemIndex !== -1) {
                // Si ya existe, incrementa la cantidad
                const updatedItems = state.items.map((item, index) => {
                    if (index === existingItemIndex) {
                        return { ...item, quantity: item.quantity + newItem.quantity };
                    }
                    return item;
                });

                return { ...state, items: updatedItems };
            }


            // Si no existe, añadirlo al carrito
            return { ...state, items: [...state.items, newItem] };
        }
        case "REMOVE_ITEM":
            // Elimina el producto que coincida tanto en id como en talla
            const filteredItems = state.items.filter(
                (item) =>
                    item.id !== action.payload.id || item.size !== action.payload.size
            );
            return {
                ...state,
                items: filteredItems,
                total: filteredItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                ),
            };
        case "UPDATE_QUANTITY":

            const updatedItems = state.items.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

            return {
                ...state,
                items: updatedItems,
                total: updatedItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                ),
            };
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                total: 0,
            };
        case 'SET_CART_ITEMS': 
            return {
                ...state,
                items: action.payload,
                total: action.payload.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                ),
            };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ cart: state, dispatch, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
