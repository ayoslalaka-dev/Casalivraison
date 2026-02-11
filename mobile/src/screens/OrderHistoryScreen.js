import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const OrderHistoryScreen = () => {
    const [orders, setOrders] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await api.get(`/orders?userId=${userInfo.id}`);
            setOrders(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchOrders();
        setRefreshing(false);
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Text>Total: {item.totalPrice} DH</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    card: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 8 },
    date: { fontWeight: 'bold' },
    status: { color: 'blue', marginVertical: 5 }
});

export default OrderHistoryScreen;
