// mobile/App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { CartProvider } from './src/context/CartContext';
import { OrderProvider } from './src/context/OrderContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider>
            <CartProvider>
                <OrderProvider>
                    <StatusBar style="auto" />
                    <AppNavigator />
                </OrderProvider>
            </CartProvider>
        </SafeAreaProvider>
    );
}
