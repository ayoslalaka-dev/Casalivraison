import React, { useContext, useState } from 'react';
import orderService from '../services/order.service';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { APP_CONFIG } from '../constants/config';

const { width } = Dimensions.get('window');

const CheckoutScreen = ({ navigation }) => {
    const { items, total, clearCart } = useContext(CartContext);
    const [selectedAddress, setSelectedAddress] = useState('home');
    const [paymentMethod, setPaymentMethod] = useState('online');

    const subtotal = total;
    const deliveryFee = APP_CONFIG.DELIVERY_FEE;
    const conciergeFee = subtotal * 0.05;
    const totalAmount = subtotal + deliveryFee + conciergeFee;

    const handlePlaceOrder = () => {
        Alert.alert(
            'Order Placed',
            'Your exclusive delivery is on its way.',
            [{
                text: 'Great', onPress: () => {
                    clearCart();
                    navigation.navigate('OrderTracking');
                }
            }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <TouchableOpacity>
                    <Ionicons name="shield-checkmark-outline" size={24} color="#E54B4B" />
                </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                    <Text style={styles.stepText}>STEP 2 OF 3: <Text style={styles.stepHighlight}>PAYMENT</Text></Text>
                    <Text style={styles.percentageText}>66% Complete</Text>
                </View>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: '66%' }]} />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="location" size={20} color="#E54B4B" />
                            <Text style={styles.sectionTitle}>Deliver to</Text>
                        </View>
                        <TouchableOpacity><Text style={styles.addNewText}>Add New</Text></TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.addressCard, selectedAddress === 'home' && styles.activeCard]}
                        onPress={() => setSelectedAddress('home')}
                    >
                        <View style={[styles.radio, selectedAddress === 'home' && styles.radioActive]}>
                            {selectedAddress === 'home' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressLabel}>HOME (GAUTHIER)</Text>
                            <Text style={styles.addressText}>24 Rue d'Alger, 3ème étage, Casablanca, 20250</Text>
                        </View>
                        <TouchableOpacity><Ionicons name="pencil" size={18} color="#BCBCBC" /></TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.addressCard, selectedAddress === 'work' && styles.activeCard]}
                        onPress={() => setSelectedAddress('work')}
                    >
                        <View style={[styles.radio, selectedAddress === 'work' && styles.radioActive]}>
                            {selectedAddress === 'work' && <View style={styles.radioInner} />}
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressLabel}>WORK (CASA PORT)</Text>
                            <Text style={styles.addressText}>Bd du 11 Janvier, Tour Crystal, Casablanca</Text>
                        </View>
                        <TouchableOpacity><Ionicons name="pencil" size={18} color="#BCBCBC" /></TouchableOpacity>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="card" size={20} color="#E54B4B" />
                            <Text style={styles.sectionTitle}>Payment Method</Text>
                        </View>
                    </View>

                    <View style={styles.paymentRow}>
                        <TouchableOpacity
                            style={[styles.paymentOption, paymentMethod === 'online' && styles.activeCard]}
                            onPress={() => setPaymentMethod('online')}
                        >
                            <Ionicons name="card-outline" size={30} color={paymentMethod === 'online' ? '#E54B4B' : '#BCBCBC'} />
                            <Text style={[styles.paymentOptionText, paymentMethod === 'online' && styles.activeOptionText]}>Pay Online</Text>
                            <Text style={styles.paymentSubtext}>VISA/MASTERCARD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.paymentOption, paymentMethod === 'cash' && styles.activeCard]}
                            onPress={() => setPaymentMethod('cash')}
                        >
                            <Ionicons name="cash-outline" size={30} color={paymentMethod === 'cash' ? '#E54B4B' : '#BCBCBC'} />
                            <Text style={[styles.paymentOptionText, paymentMethod === 'cash' && styles.activeOptionText]}>Cash / COD</Text>
                            <Text style={styles.paymentSubtext}>PAY AT DOOR</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardSelector}>
                        <View style={styles.visaBadge}>
                            <Text style={styles.visaText}>VISA</Text>
                        </View>
                        <Text style={styles.cardNumber}>•••• 8824</Text>
                        <TouchableOpacity><Text style={styles.changeCardText}>Change Card</Text></TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleRow}>
                            <Ionicons name="receipt" size={20} color="#E54B4B" />
                            <Text style={styles.sectionTitle}>Order Summary</Text>
                        </View>
                    </View>

                    <View style={styles.summaryTable}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal ({items.length} items)</Text>
                            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Fee</Text>
                            <Text style={[styles.summaryValue, deliveryFee === 0 ? { color: '#2E7D32', fontWeight: '800' } : {}]}>
                                {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Concierge Fee (5%)</Text>
                            <Text style={styles.summaryValue}>{formatPrice(conciergeFee)}</Text>
                        </View>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>{formatPrice(totalAmount)}</Text>
                    </View>
                </View>

                <View style={styles.trustBadges}>
                    <View style={styles.badgeItem}>
                        <Ionicons name="shield-checkmark" size={20} color="#757575" />
                        <Text style={styles.badgeLabel}>SSL SECURE</Text>
                    </View>
                    <View style={styles.badgeItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#757575" />
                        <Text style={styles.badgeLabel}>BUYER PROTECTION</Text>
                    </View>
                    <View style={styles.badgeItem}>
                        <Ionicons name="headset" size={20} color="#757575" />
                        <Text style={styles.badgeLabel}>24/7 SUPPORT</Text>
                    </View>
                </View>

                <Text style={styles.termsText}>
                    By placing your order, you agree to our terms of service and privacy policy. Your data is protected with AES-256 encryption.
                </Text>
            </ScrollView>

            <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                <LinearGradient
                    colors={['#E54B4B', '#EB5757']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.buttonText}>Place Order • {formatPrice(totalAmount)}</Text>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    progressContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    stepText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#BCBCBC',
    },
    stepHighlight: {
        color: '#E54B4B',
    },
    percentageText: {
        fontSize: 12,
        color: '#BCBCBC',
    },
    progressBarBg: {
        height: 4,
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#E54B4B',
        borderRadius: 2,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
        marginLeft: 10,
    },
    addNewText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#E54B4B',
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginBottom: 12,
    },
    activeCard: {
        borderColor: '#E54B4B',
        borderWidth: 2,
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#BCBCBC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioActive: {
        borderColor: '#E54B4B',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E54B4B',
    },
    addressInfo: {
        flex: 1,
        marginLeft: 15,
    },
    addressLabel: {
        fontSize: 14,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 13,
        color: '#757575',
        lineHeight: 18,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    paymentOption: {
        flex: 0.48,
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    paymentOptionText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#1A1A1A',
        marginTop: 10,
    },
    activeOptionText: {
        color: '#E54B4B',
    },
    paymentSubtext: {
        fontSize: 10,
        color: '#BCBCBC',
        fontWeight: '700',
    },
    cardSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F5',
        padding: 15,
        borderRadius: 15,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#E54B4B',
    },
    visaBadge: {
        backgroundColor: '#1A1FD6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    visaText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
    },
    cardNumber: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        letterSpacing: 2,
    },
    changeCardText: {
        color: '#E54B4B',
        fontWeight: '700',
        fontSize: 13,
    },
    summaryTable: {
        paddingVertical: 10,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#757575',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '600',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        marginTop: 5,
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
    trustBadges: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    badgeItem: {
        alignItems: 'center',
    },
    badgeLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#BCBCBC',
        marginTop: 5,
    },
    termsText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#BCBCBC',
        lineHeight: 18,
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    placeOrderButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        shadowColor: '#E54B4B',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    buttonGradient: {
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
        flex: 1,
        textAlign: 'center',
    },
});

export default CheckoutScreen;
