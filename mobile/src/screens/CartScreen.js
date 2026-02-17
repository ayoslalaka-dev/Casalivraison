import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api.service';

const { width } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {
    const { items, total, clearCart, removeFromCart, addToCart } = useContext(CartContext);
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const deliveryFee = 0; // FREE for VIP
    const serviceFee = total * 0.05;
    const grandTotal = total + deliveryFee + serviceFee;

    const handleCheckout = () => {
        if (items.length === 0) return;
        navigation.navigate('Checkout');
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image
                source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop' }}
                style={styles.itemImage}
            />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.quantityRow}>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => item.quantity > 1 ? addToCart(item, -1) : removeFromCart(item.menuId)}
                    >
                        <Ionicons name="remove" size={16} color="#757575" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => addToCart(item, 1)}
                    >
                        <Ionicons name="add" size={16} color="#E54B4B" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromCart(item.menuId)}
            >
                <Ionicons name="trash-outline" size={20} color="#BCBCBC" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Selection Briefcase</Text>
                <TouchableOpacity onPress={() => items.length > 0 && clearCart()}>
                    <Text style={[styles.clearText, items.length === 0 && { opacity: 0.3 }]}>Clear</Text>
                </TouchableOpacity>
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconCircle}>
                        <Ionicons name="cart-outline" size={60} color="#E54B4B" />
                    </View>
                    <Text style={styles.emptyTitle}>Your briefcase is empty</Text>
                    <Text style={styles.emptySubtitle}>Explore the elite collection and add your favorite dishes to your luxury delivery selection.</Text>
                    <TouchableOpacity
                        style={styles.discoverBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.discoverBtnText}>Discover Restaurants</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        keyExtractor={item => item.menuId.toString()}
                        renderItem={renderCartItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.footer}>
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Express Delivery</Text>
                                <Text style={[styles.summaryValue, { color: '#2E7D32' }]}>FREE</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Concierge Fee (5%)</Text>
                                <Text style={styles.summaryValue}>${serviceFee.toFixed(2)}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Grand Total</Text>
                                <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.checkoutBtn}
                            onPress={handleCheckout}
                            disabled={loading}
                        >
                            <LinearGradient
                                colors={['#E54B4B', '#EB5757']}
                                style={styles.checkoutGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                                        <Ionicons name="arrow-forward" size={20} color="white" />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    clearText: {
        fontSize: 14,
        color: '#E54B4B',
        fontWeight: '700',
    },
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 15,
        color: '#E54B4B',
        fontWeight: '800',
        marginBottom: 8,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        padding: 4,
        alignSelf: 'flex-start',
    },
    qtyBtn: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        paddingHorizontal: 12,
        fontWeight: '700',
        color: '#1A1A1A',
        fontSize: 14,
    },
    removeBtn: {
        padding: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#757575',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    discoverBtn: {
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 15,
    },
    discoverBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
    footer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 8,
    },
    summaryCard: {
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#757575',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 14,
        color: '#1A1A1A',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#E54B4B',
    },
    checkoutBtn: {
        borderRadius: 15,
        overflow: 'hidden',
    },
    checkoutGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 20,
    },
    checkoutBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        marginRight: 10,
    },
});

export default CartScreen;
