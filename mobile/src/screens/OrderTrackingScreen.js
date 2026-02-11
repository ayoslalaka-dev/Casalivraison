// mobile/src/screens/OrderTrackingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, ScrollView } from 'react-native';
import api from '../services/api';

const OrderTrackingScreen = ({ route, navigation }) => {
    const { orderId } = route.params;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const response = await api.orders.getOne(orderId);
            setOrder(response.data.data);
        } catch (e) {
            console.error('Error fetching order:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
        const interval = setInterval(fetchOrder, 10000);
        return () => clearInterval(interval);
    }, [orderId]);

    if (loading) return <ActivityIndicator size="large" style={styles.center} />;
    if (!order) return <View style={styles.center}><Text>Commande introuvable</Text></View>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Commande #{order.id}</Text>

            <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Statut actuel:</Text>
                <Text style={styleForStatus(order.status)}>{order.status}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Détails</Text>
                <Text>Prix Total: <Text style={styles.bold}>{order.totalPrice} DH</Text></Text>
                <Text style={{ marginTop: 5 }}>Livreur: <Text style={styles.bold}>{order.driver ? order.driver.name : 'En attente...'}</Text></Text>
                {order.driver && <Text>Tél: {order.driver.phone}</Text>}
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Articles</Text>
                {order.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Text>- {item.quantity}x {item.menu ? item.menu.name : 'Article'}</Text>
                        <Text>{item.price} DH</Text>
                    </View>
                ))}
            </View>

            <Button title="Retour à l'accueil" onPress={() => navigation.popToTop()} />
        </ScrollView>
    );
};

const styleForStatus = (status) => {
    switch (status) {
        case 'PENDING': return { fontSize: 24, fontWeight: 'bold', color: 'orange' };
        case 'VALIDATED': return { fontSize: 24, fontWeight: 'bold', color: 'blue' };
        case 'IN_DELIVERY': return { fontSize: 24, fontWeight: 'bold', color: 'purple' };
        case 'DELIVERED': return { fontSize: 24, fontWeight: 'bold', color: 'green' };
        case 'CANCELLED': return { fontSize: 24, fontWeight: 'bold', color: 'red' };
        default: return { fontSize: 24, fontWeight: 'bold', color: 'black' };
    }
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    statusContainer: { alignItems: 'center', marginBottom: 30 },
    statusLabel: { fontSize: 16, color: '#666' },
    card: { marginBottom: 20, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    bold: { fontWeight: 'bold' },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }
});

export default OrderTrackingScreen;
