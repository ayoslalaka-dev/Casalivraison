import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';

// Placeholder Screens (will be implemented next)
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RestaurantListScreen from './src/screens/RestaurantListScreen';
import RestaurantDetailScreen from './src/screens/RestaurantDetailScreen';
import CartScreen from './src/screens/CartScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Restaurants" component={RestaurantListScreen} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
    </Stack.Navigator>
);

const AppNav = () => {
    const { userToken } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {userToken !== null ? (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                    <Tab.Screen name="Cart" component={CartScreen} />
                    <Tab.Screen name="Orders" component={OrderHistoryScreen} />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <StatusBar style="auto" />
            <AppNav />
        </AuthProvider>
    );
}
