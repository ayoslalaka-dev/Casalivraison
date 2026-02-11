import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const RestaurantDetailScreen = ({ route }) => {
    const { id } = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get(`/restaurants/${id}`);
                setRestaurant(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchDetails();
    }, [id]);

    if (!restaurant) return <Text>Loading...</Text>;

    const renderItem = ({ item }) => (
        <View style={styles.menuItem}>
            <View style={{ flex: 1 }}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text style={styles.price}>{item.price} DH</Text>
            </View>
            <Button title="Add" onPress={() => {
                addToCart(item, 1);
                Alert.alert('Added', `${item.name} added to cart`);
            }} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <FlatList
                data={restaurant.menus}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    menuName: { fontSize: 16, fontWeight: '600' },
    price: { fontWeight: 'bold', marginTop: 5 }
});

export default RestaurantDetailScreen;
