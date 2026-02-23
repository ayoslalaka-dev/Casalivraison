import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import orderService from '../services/order.service';
import { formatPrice } from '../utils/formatters';

const { width, height } = Dimensions.get('window');

const OrderTrackingScreen = ({ route, navigation }) => {
    const { orderId } = route.params || { orderId: '882-VIP' };
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Default Casablanca coordinates
    const CASABLANCA_REGION = {
        latitude: 33.5731,
        longitude: -7.5898,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    const DESTINATION_COORD = {
        latitude: 33.5898,
        longitude: -7.6038,
    };

    const fetchOrder = async () => {
        try {
            if (orderId) { // Ensure orderId exists before fetching
                const response = await orderService.getOne(orderId);
                setOrder(response.data.data);
            } else {
                // Mock order for demo if no ID
                setOrder({
                    id: '882-VIP',
                    status: 'IN_DELIVERY',
                    driver: {
                        name: 'James Richardson',
                        rating: 4.9,
                        vehicle: 'Black Sedan',
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
                    },
                    eta: '12',
                    location: 'Fifth Ave',
                    totalPrice: 145.50
                });
            }
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

    if (loading) return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#E54B4B" />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Real map using react-native-maps */}
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapBackground}
                initialRegion={CASABLANCA_REGION}
            >
                <Marker coordinate={DESTINATION_COORD} />
            </MapView>

            <SafeAreaView style={styles.overlay} pointerEvents="box-none">
                <View style={styles.headerBar}>
                    <TouchableOpacity
                        style={styles.headerIcon}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Ionicons name="help-circle" size={24} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>

                <View style={styles.etaCard}>
                    <View style={styles.etaHeaderRow}>
                        <Text style={styles.etaLabel}>ESTIMATED ARRIVAL</Text>
                        <Text style={styles.priceLabel}>{formatPrice(parseFloat(order.totalPrice || order.totalAmount || 0))}</Text>
                    </View>
                    <View style={styles.etaRow}>
                        <Text style={styles.etaTime}>{order.eta || '12'}</Text>
                        <Text style={styles.etaUnit}>mins</Text>
                    </View>
                    <Text style={styles.etaSubtext}>Your order is approaching {order.location || 'Fifth Ave'}</Text>
                </View>

                <View style={styles.statusProgressCard}>
                    <View style={styles.progressLineContainer}>
                        <View style={styles.progressLineBg} />
                        <View style={[styles.progressLineFill, { width: '50%' }]} />

                        <View style={styles.statusMarkers}>
                            <View style={[styles.marker, styles.markerActive]}>
                                <Ionicons name="checkmark" size={12} color="white" />
                            </View>
                            <View style={[styles.marker, styles.markerActive, styles.markerLarge]}>
                                <Ionicons name="bicycle" size={16} color="white" />
                                <View style={styles.markerPulse} />
                            </View>
                            <View style={styles.marker} />
                        </View>
                    </View>
                    <View style={styles.statusLabels}>
                        <Text style={[styles.statusLabel, styles.activeStatusLabel]}>PREPARING</Text>
                        <Text style={[styles.statusLabel, styles.activeStatusLabel, { color: '#E54B4B' }]}>ON THE WAY</Text>
                        <Text style={styles.statusLabel}>DELIVERED</Text>
                    </View>
                </View>

                <View style={styles.driverCard}>
                    <View style={styles.driverInfoRow}>
                        <Image
                            source={{ uri: order.driver?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop' }}
                            style={styles.driverAvatar}
                        />
                        <View style={styles.driverTextInfo}>
                            <Text style={styles.driverName}>{order.driver?.name || 'James Richardson'}</Text>
                            <View style={styles.driverRatingRow}>
                                <Ionicons name="star" size={14} color="#E54B4B" />
                                <Text style={styles.driverRatingText}>{order.driver?.rating || '4.9'}</Text>
                                <Text style={styles.driverDivider}>•</Text>
                                <Text style={styles.driverVehicle}>{order.driver?.vehicle || 'Black Sedan'} • {order.id || '882-VIP'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.driverActions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="chatbubble" size={20} color="#1A1A1A" />
                            <Text style={styles.actionButtonText}>Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.contactButton]}>
                            <Ionicons name="call" size={20} color="white" />
                            <Text style={[styles.actionButtonText, styles.contactButtonText]}>Contact</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    mapBackground: {
        position: 'absolute',
        width: width,
        height: height,
        overflow: 'hidden',
    },
    mapGridOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        opacity: 0.15,
    },
    mapGridLine: {
        width: '12.5%',
        height: '100%',
        borderRightWidth: 1,
        borderColor: '#004d40',
    },
    mapLabel: {
        color: '#004d40',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 8,
        letterSpacing: 0.5,
        backgroundColor: 'rgba(255,255,255,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    mapMarker: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        borderWidth: 2,
        borderColor: '#E54B4B',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    overlay: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    headerIcon: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    etaCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 20,
    },
    etaHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    etaLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#E54B4B',
        letterSpacing: 1,
    },
    priceLabel: {
        fontSize: 14,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    etaRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    etaTime: {
        fontSize: 64,
        fontWeight: '800',
        color: '#1A1A1A',
        lineHeight: 70,
    },
    etaUnit: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1A1A1A',
        marginLeft: 10,
        marginBottom: 12,
    },
    etaSubtext: {
        fontSize: 15,
        color: '#757575',
        fontWeight: '500',
    },
    statusProgressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    progressLineContainer: {
        height: 40,
        justifyContent: 'center',
        position: 'relative',
    },
    progressLineBg: {
        height: 3,
        backgroundColor: '#F5F5F5',
        width: '100%',
        position: 'absolute',
    },
    progressLineFill: {
        height: 3,
        backgroundColor: '#E54B4B',
        position: 'absolute',
    },
    statusMarkers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    marker: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerActive: {
        backgroundColor: '#E54B4B',
    },
    markerLarge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 3,
        borderColor: '#FFF5F5',
    },
    markerPulse: {
        position: 'absolute',
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: 'rgba(229, 75, 75, 0.15)',
        zIndex: -1,
    },
    statusLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    statusLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#BCBCBC',
        letterSpacing: 0.5,
    },
    activeStatusLabel: {
        color: '#757575',
    },
    driverCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    driverInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    driverAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    driverTextInfo: {
        flex: 1,
        marginLeft: 15,
    },
    driverName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    driverRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverRatingText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1A1A1A',
        marginLeft: 4,
    },
    driverDivider: {
        marginHorizontal: 8,
        color: '#BCBCBC',
    },
    driverVehicle: {
        fontSize: 13,
        color: '#757575',
        fontWeight: '500',
    },
    driverActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 0.48,
        flexDirection: 'row',
        height: 50,
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
        marginLeft: 8,
    },
    contactButton: {
        backgroundColor: '#E54B4B',
    },
    contactButtonText: {
        color: '#FFFFFF',
    },
});

export default OrderTrackingScreen;
