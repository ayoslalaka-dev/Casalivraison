// mobile/src/screens/RestaurantDetailScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const RestaurantDetailScreen = ({ route }) => {
    const { id } = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.restaurants.getOne(id);
                // API returns { success: true, data: { ... } }
                setRestaurant(response.data.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <ActivityIndicator size="large" style={styles.center} />;
    if (!restaurant) return <View style={styles.center}><Text>Restaurant introuvable</Text></View>;

    const renderItem = ({ item }) => (
        <View style={styles.menuItem}>
            <View style={{ flex: 1 }}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDesc}>{item.description}</Text>
                <Text style={styles.price}>{item.price} DH</Text>
            </View>
            <Button title="Ajouter" onPress={() => {
                addToCart(item, 1);
                Alert.alert('Succès', `${item.name} ajouté au panier`);
            }} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text style={styles.category}>{restaurant.category?.name}</Text>
                <Text style={styles.address}>{restaurant.address}</Text>
            </View>
            <Text style={styles.sectionTitle}>Menu</Text>
            <FlatList
                data={restaurant.menus}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { padding: 20, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#eee' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
    category: { fontSize: 16, color: '#666', marginBottom: 5 },
    address: { fontSize: 14, color: '#888' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', margin: 15, marginBottom: 5 },
    list: { paddingHorizontal: 15 },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    menuName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    menuDesc: { fontSize: 14, color: '#666', marginBottom: 4 },
    price: { fontWeight: 'bold', color: 'tomato' }
});

export default RestaurantDetailScreen;
