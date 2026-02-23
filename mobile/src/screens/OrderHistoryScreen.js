import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import orderService from '../services/order.service';

const OrderHistoryScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Added isLoading state

    const fetchOrders = async () => {
        try {
            setIsLoading(true); // Set loading to true
            const response = await orderService.getAll(1); // Guest user ID is 1
            setOrders(response.data.data || response.data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'DELIVERED': return '#2E7D32';
            case 'IN_DELIVERY': return '#E54B4B';
            case 'PENDING': return '#F9A825';
            default: return '#757575';
        }
    };

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.restaurantInfo}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="restaurant" size={18} color="#E54B4B" />
                    </View>
                    <View>
                        <Text style={styles.restaurantName}>{item.restaurantName || "Premium Dining"}</Text>
                        <Text style={styles.orderDate}>{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
                    </View>
                </View>
                <Text style={styles.orderAmount}>${item.totalPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.cardFooter}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
                <View style={styles.orderIdRow}>
                    <Text style={styles.orderIdLabel}>Order ID:</Text>
                    <Text style={styles.orderIdValue}>#{item.id}</Text>
                </View>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#BCBCBC" style={styles.arrowIcon} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={styles.headerTitle}>Order Archives</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={20} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            {orders.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconCircle}>
                        <Ionicons name="receipt-outline" size={50} color="#BCBCBC" />
                    </View>
                    <Text style={styles.emptyTitle}>No Orders Yet</Text>
                    <Text style={styles.emptySubtitle}>Your luxury delivery history will appear here once you've placed your first elite order.</Text>
                </View>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderOrderItem}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#E54B4B" />
                    }
                    showsVerticalScrollIndicator={false}
                />
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
        paddingHorizontal: 25,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 20,
    },
    orderCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    restaurantInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    orderDate: {
        fontSize: 12,
        color: '#BCBCBC',
        fontWeight: '600',
    },
    orderAmount: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F7F7F7',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    orderIdRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderIdLabel: {
        fontSize: 11,
        color: '#BCBCBC',
        fontWeight: '600',
        marginRight: 4,
    },
    orderIdValue: {
        fontSize: 11,
        color: '#1A1A1A',
        fontWeight: '700',
    },
    arrowIcon: {
        position: 'absolute',
        top: '50%',
        right: 15,
        marginTop: -9,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 10,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#BCBCBC',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default OrderHistoryScreen;
