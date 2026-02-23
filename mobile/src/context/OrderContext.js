// mobile/src/context/OrderContext.js
import React, { createContext, useState, useEffect } from 'react';
import orderService from '../services/order.service';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await orderService.getAll(1); // Using 1 for the default guest user
            // API returns { success: true, data: [...] }
            setOrders(response.data.data || response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setCurrentActiveOrder = (order) => {
        setCurrentOrder(order);
    };

    const getOrderById = async (id) => {
        try {
            const response = await orderService.getOne(id);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Error getting order:', error);
            return null;
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <OrderContext.Provider value={{
            orders,
            currentOrder,
            isLoading,
            fetchOrders,
            setCurrentActiveOrder,
            getOrderById
        }}>
            {children}
        </OrderContext.Provider>
    );
};
