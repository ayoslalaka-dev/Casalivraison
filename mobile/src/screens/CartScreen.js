// mobile/src/screens/CartScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const CartScreen = ({ navigation }) => {
    const { items, total, clearCart, removeFromCart } = useContext(CartContext);
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const placeOrder = async () => {
        if (items.length === 0) return;
        setLoading(true);
        try {
            const response = await api.orders.create({
                userId: userInfo.id,
                items: items
            });

            Alert.alert('Succès', 'Commande passée avec succès !');
            clearCart();

            // Navigation vers le suivi avec l'ID de la commande créée
            const orderId = response.data.data.id;
            navigation.navigate('OrderTracking', { orderId });

        } catch (e) {
            console.error(e);
            Alert.alert('Erreur', 'Impossible de passer la commande.');
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.itemName}>{item.name} x {item.quantity}</Text>
                <Text>{item.price * item.quantity} DH</Text>
            </View>
            <Button title="Supprimer" color="red" onPress={() => removeFromCart(item.menuId)} />
        </View>
    );

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

    return (
        <View style={styles.container}>
            {items.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>Votre panier est vide</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        keyExtractor={item => item.menuId.toString()}
                        renderItem={renderItem}
                    />
                    <View style={styles.footer}>
                        <View style={styles.row}>
                            <Text>Sous-total:</Text>
                            <Text>{total} DH</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Livraison:</Text>
                            <Text>20 DH</Text>
                        </View>
                        <View style={[styles.row, { marginTop: 10 }]}>
                            <Text style={styles.total}>Total:</Text>
                            <Text style={styles.total}>{total + 20} DH</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button title="Commander" onPress={placeOrder} color="tomato" />
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 18, color: '#666' },
    item: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
    itemName: { fontSize: 16, fontWeight: 'bold' },
    footer: { marginTop: 20, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    total: { fontSize: 18, fontWeight: 'bold' }
});

export default CartScreen;
