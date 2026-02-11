// mobile/src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons'; // Assurez-vous d'avoir installé @expo/vector-icons si utilisé, sinon retirez

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Restaurants" component={RestaurantListScreen} options={{ title: 'CasaLivraison' }} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} options={{ title: 'Menu' }} />
    </Stack.Navigator>
);

const AppTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = focused ? 'restaurant' : 'restaurant-outline';
                else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
                else if (route.name === 'Orders') iconName = focused ? 'list' : 'list-outline';
                // Fallback si Ionicons n'est pas dispo ou pour simplifier: return null ou Text
                // return <Ionicons name={iconName} size={size} color={color} />;
                return null;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
    >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Cart" component={CartStack} />
        <Tab.Screen name="Orders" component={OrderHistoryScreen} options={{ headerShown: true, title: 'Historique' }} />
    </Tab.Navigator>
);

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

export const AppNavigator = () => {
    const { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) {
        // You can return a Loading Spinner here
        return null;
    }

    return (
        <NavigationContainer>
            {userToken ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};
