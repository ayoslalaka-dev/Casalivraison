import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addToCart = (menu, quantity) => {
        setItems(prevItems => {
            const existing = prevItems.find(item => item.menuId === menu.id);
            if (existing) {
                return prevItems.map(item =>
                    item.menuId === menu.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevItems, { menuId: menu.id, name: menu.name, price: menu.price, quantity }];
        });
    };

    const removeFromCart = (menuId) => {
        setItems(prevItems => prevItems.filter(item => item.menuId !== menuId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};
