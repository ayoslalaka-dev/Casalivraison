// mobile/src/screens/RestaurantListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantListScreen = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await api.restaurants.getAll();
                // API returns { success: true, data: [...] }
                setRestaurants(response.data.data);
            } catch (e) {
                console.error('Error fetching restaurants:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={styles.center} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={restaurants}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <RestaurantCard
                        restaurant={item}
                        onPress={() => navigation.navigate('RestaurantDetail', { id: item.id })}
                    />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    list: { padding: 15 }
});

export default RestaurantListScreen;
