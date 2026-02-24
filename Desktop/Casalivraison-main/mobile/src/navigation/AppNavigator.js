// mobile/src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';

import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Restaurants" component={RestaurantListScreen} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
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
                else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#E54B4B',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 }
        })}
    >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Orders" component={OrderHistoryScreen} options={{ headerShown: true, title: 'Historique' }} />
    </Tab.Navigator>
);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="MainTabs" component={AppTabs} />
                <Stack.Screen
                    name="OrderTracking"
                    component={OrderTrackingScreen}
                    options={{
                        headerShown: true,
                        title: 'Suivi de commande',
                        headerBackTitle: 'Retour'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { AppNavigator };

