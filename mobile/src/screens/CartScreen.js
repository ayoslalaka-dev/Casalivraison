import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const CartScreen = ({ navigation }) => {
    const { items, total, clearCart, removeFromCart } = useContext(CartContext);
    const { userInfo } = useContext(AuthContext);

    const placeOrder = async () => {
        if (items.length === 0) return;
        try {
            await api.post('/orders', {
                userId: userInfo.id,
                items: items
            });
            Alert.alert('Success', 'Order placed successfully!');
            clearCart();
            navigation.navigate('Orders');
        } catch (e) {
            Alert.alert('Error', 'Failed to place order');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name} x {item.quantity}</Text>
            <Text>{item.price * item.quantity} DH</Text>
            <Button title="Remove" color="red" onPress={() => removeFromCart(item.menuId)} />
        </View>
    );

    return (
        <View style={styles.container}>
            {items.length === 0 ? (
                <Text>Cart is empty</Text>
            ) : (
                <>
                    <FlatList
                        data={items}
                        keyExtractor={item => item.menuId.toString()}
                        renderItem={renderItem}
                    />
                    <View style={styles.footer}>
                        <Text style={styles.total}>Total: {total} DH (+ 20 DH Delivery)</Text>
                        <Button title="Place Order" onPress={placeOrder} />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
    footer: { marginTop: 20, borderTopWidth: 2, paddingTop: 10 },
    total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});

export default CartScreen;
